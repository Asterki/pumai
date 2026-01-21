import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import * as RagDocumentsAPITypes from "../../../../shared/api/rag-documents";
import { IRAGDocument } from "../../../../shared/models/rag-document";

import LoggingService from "../../services/logging";
import EmailService from "../../services/email";

import { createRagDocChunkWithRetry } from "../../services/chroma/rag-documents/create";
import OllamaEmbedService from "../../services/ollama/embed";

import { APIError } from "../../errors/api";

import { v4 as uuidv4 } from "uuid";

const handler = async (
  req: Request<{}, {}, RagDocumentsAPITypes.CreateRequestBody>,
  res: Response<RagDocumentsAPITypes.CreateResponseData>,
  _next: NextFunction,
) => {
  const session = await mongoose.startSession();
  const {
    campuses,
    content,
    effectiveFrom,
    category,
    authorityLevel,
    tags,
    effectiveUntil,
  } = req.body;
  const adminAccount = req.user as IRAGDocument;

  try {
    session.startTransaction();

    const embedding = await OllamaEmbedService.getInstance().embedText(
      content as string,
    );
    console.log(embedding);

    // Pass session explicitly to service
    createRagDocChunkWithRetry(
      {
        warnings: [],
        archived: false,
        chunkId: uuidv4(), // Will be generated in services
        chunkIndex: 0, // Single chunk document
        deliveryModes: [],
        docId: "", // Will be generated in services
        publicUrl: "",
        content: content ?? "",
        category,
        authorityLevel,
        campuses,
        effectiveFrom: new Date(effectiveFrom),
        effectiveUntil: effectiveUntil ? new Date(effectiveUntil) : null,
        tags: tags || [],
        embedding,
      },
      {
        traceId: req.traceId,
      },
    );

    await session.commitTransaction();

    // Respond with created account (no logging here, service already logged)
    res.status(201).json({
      status: "success",
    });
  } catch (error: unknown) {
    await session.abortTransaction();
    if (error instanceof APIError) {
      res.status(error.httpStatus).send({ status: error.status });
      return;
    }

    if (error instanceof Error) {
      LoggingService.log({
        source: "api:rag-documents:create",
        level: "error",
        message: "Error during RAG document creation",
        traceId: req.traceId,
        details: {
          error: error.message,
          stack: error.stack,
        },
        metadata: {
          createdBy: adminAccount?._id,
          createdAt: new Date(),
        },
      });
      res.status(500).json({
        status: "internal-error",
      });
    }
  } finally {
    await session.endSession();
  }
};

export default handler;
