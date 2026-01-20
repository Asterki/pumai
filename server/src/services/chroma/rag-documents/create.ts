// services/chroma/ragDocChunks.ts

import retry from "async-retry";
import { performance } from "perf_hooks";

import LoggingService from "../../logging";
import ChromaService from "../../chroma";

export const RAG_DOC_CHUNKS_COLLECTION = "rag-doc-chunks";

export type CreateRagDocChunkParameters = {
  chunkId: string; // deterministic: `${docId}:${chunkIndex}`
  embedding: number[];

  content: string;

  docId: string;
  chunkIndex: number;

  category: string;
  authorityLevel: number;

  campuses: string[];
  deliveryModes: string[];

  effectiveFrom: Date;
  effectiveUntil: Date | null;
  archived: boolean;

  warnings: string[];
  tags: string[];

  publicUrl: string; // `/document/{docId}`
};

export type CreateRagDocChunkOptions = {
  traceId?: string;
};

export async function createRagDocChunk(
  parameters: CreateRagDocChunkParameters,
  options: CreateRagDocChunkOptions = {},
): Promise<void> {
  const startTime = performance.now();

  const chromaClient = ChromaService.getInstance().getClient();
  const collection = await chromaClient.getOrCreateCollection({
    name: RAG_DOC_CHUNKS_COLLECTION,
    metadata: {
      description: "RAG document chunks for university knowledge base",
    },
  });

  const {
    chunkId,
    embedding,
    content,
    docId,
    chunkIndex,
    category,
    authorityLevel,
    campuses,
    deliveryModes,
    effectiveFrom,
    effectiveUntil,
    archived,
    warnings,
    tags,
    publicUrl,
  } = parameters;

  await collection.add({
    ids: [chunkId],
    embeddings: [embedding],
    documents: [content],
    metadatas: [
      {
        docId,
        chunkIndex,
        category,
        authorityLevel,
        campuses: campuses.join(","),
        deliveryModes: deliveryModes.join(","),
        effectiveFrom: effectiveFrom.toISOString(),
        effectiveUntil: effectiveUntil ? effectiveUntil.toISOString() : null,
        archived,
        warnings: warnings.join("~"),
        tags: tags.join(","),
        publicUrl,
      },
    ],
  });

  LoggingService.log({
    source: "services:chroma:rag-doc-chunks:create",
    level: "important",
    traceId: options.traceId,
    message: "RAG document chunk created",
    duration: Number((performance.now() - startTime).toFixed(3)),
    details: {
      chunkId,
      docId,
      chunkIndex,
      category,
    },
    metadata: {
      createdAt: new Date(),
    },
  });
}

export async function createRagDocChunkWithRetry(
  parameters: CreateRagDocChunkParameters,
  options: CreateRagDocChunkOptions = {},
): Promise<void> {
  return retry(
    async (_, attempt) => {
      const startTime = performance.now();
      try {
        return await createRagDocChunk(parameters, options);
      } catch (error: any) {
        LoggingService.log({
          source: "services:chroma:rag-doc-chunks:create:retry",
          level: "warning",
          traceId: options.traceId,
          message: `Retryable error creating RAG doc chunk (attempt ${attempt})`,
          duration: Number((performance.now() - startTime).toFixed(3)),
          details: {
            error: error.message,
            stack: error.stack,
          },
        });

        throw error;
      }
    },
    {
      retries: 3,
      minTimeout: 500,
      maxTimeout: 3000,
      factor: 2,
    },
  );
}
