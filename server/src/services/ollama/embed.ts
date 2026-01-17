import { EmbedRequest, Ollama } from "ollama";
import { OllamaEmbeddingFunction } from "@chroma-core/ollama";
import { Metadata, QueryResult } from "chromadb";

import OllamaClient from "./client";
import ChromaService from "../chroma";

class OllamaEmbeddingClient {
  private static instance: OllamaEmbeddingClient | null = null;
  private embedder: OllamaEmbeddingFunction;
  private client: Ollama = OllamaClient.getInstance().getClient();

  public static getInstance() {
    if (!OllamaEmbeddingClient.instance)
      OllamaEmbeddingClient.instance = new OllamaEmbeddingClient();
    return OllamaEmbeddingClient.instance;
  }

  constructor() {
    this.embedder = new OllamaEmbeddingFunction({
      url: process.env.OLLAMA_URL || "http://localhost:11434",
      model: process.env.OLLAMA_EMBEDDING_MODEL || "embeddinggemma:latest",
    });
  }

  public getEmbedder() {
    return this.embedder;
  }

  public async embedText(
    text: string,
    options?: EmbedRequest,
  ): Promise<number[]> {
    console.log(process.env.OLLAMA_EMBEDDING_MODEL);
    const response = await this.client.embed({
      model: process.env.OLLAMA_EMBEDDING_MODEL || "embeddinggemma:latest",
      input: text,
      ...options,
    });
    return response.embeddings[0];
  }

  async getContext(prompt: string): Promise<QueryResult<Metadata>> {
    const queryEmbedding = await this.embedText(prompt);

    // Call the database
    const collection = ChromaService.getInstance().getCollection();
    const results = await collection!.query({
      queryEmbeddings: [queryEmbedding], // Apply RAG
      nResults: 3,
    });

    return results;
  }
}

export default OllamaEmbeddingClient;
