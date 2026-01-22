import { Request, Response, NextFunction } from "express";
import * as RAGDocumentAPITypes from "../../../../shared/api/rag-documents";

import { IAccount } from "../../../../shared/models/account";
import LoggingService from "../../services/logging";
import ChromaService from "../../services/chroma";

const COLLECTION_NAME = "rag-documents";

const handler = async (
  req: Request<{}, {}, RAGDocumentAPITypes.ListRequestBody>,
  res: Response<RAGDocumentAPITypes.ListResponseData>,
  _next: NextFunction,
) => {
  const { page, count, /* search, */ includeDeleted } = req.body;
  const adminAccount = req.user as IAccount;

  try {
    const chroma = ChromaService.getInstance().getClient();
    const collection = await chroma.getCollection({
      name: COLLECTION_NAME,
    });

    /**
     * Build Chroma `where` filters
     * Chroma only supports AND-style filters
     */
    const where: Record<string, any> = {};

    // --- SEARCH (commented out as requested) ---
    /*
    if (search?.query) {
      // Would require query embedding + similarity search
    }
    */

    if (!includeDeleted) {
      where["metadata.deleted"] = { $ne: true };
    }

    /**
     * Fetch documents
     */
    const result = await collection.get({
      where,
      limit: count,
      offset: page * count,
      include: ["metadatas", "documents"],
    });

    console.log(result);

    /**
     * Normalize response
     */
    const documents = (result.metadatas ?? []).map((metadata, index) => ({
      ...metadata,
      content: result.documents?.[index] ?? null,
    }));

    /**
     * Client-side sort (Chroma does NOT support server sorting)
     */
    documents.sort(
      (a: any, b: any) =>
        new Date(b.metadata?.createdAt ?? 0).getTime() -
        new Date(a.metadata?.createdAt ?? 0).getTime(),
    );

    res.status(200).json({
      status: "success",
      ragDocuments: documents as any,
      totalRagDocuments: result.ids?.length ?? 0,
    });
  } catch (error: unknown) {
    console.error("Error listing accounts:", error);
    if (error instanceof Error) {
      LoggingService.log({
        source: "api:rag-documents:list",
        level: "error",
        traceId: req.traceId,
        message: "Unexpected error during RAG document listing",
        details: { error: error.message, stack: error.stack },
        metadata: {
          createdBy: adminAccount?._id,
          createdAt: new Date(),
        },
      });
    }

    res.status(500).json({ status: "internal-error" });
  }
};

export default handler;
