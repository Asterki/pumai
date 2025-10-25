import { Ollama } from "ollama";
import { OllamaEmbeddingFunction } from "@chroma-core/ollama";

import ChromaService from "./chroma";

class OllamaClient {
  private static instance: OllamaClient | null = null;
  private client: Ollama;
  private embedder: OllamaEmbeddingFunction;

  public static getInstance() {
    if (!OllamaClient.instance) OllamaClient.instance = new OllamaClient();
    return OllamaClient.instance;
  }

  constructor() {
    // Initialize the Ollama client with env.OLLAMA_URL
    this.client = new Ollama({
      host: process.env.OLLAMA_URL || "http://localhost:11434",
    });

    this.embedder = new OllamaEmbeddingFunction({
      url: process.env.OLLAMA_URL || "http://localhost:11434",
      model: process.env.OLLAMA_EMBEDDING_MODEL || "embeddinggemma:latest",
    });
  }

  public getClient() {
    return this.client;
  }

  public getEmbedder() {
    return this.embedder;
  }

  public async embedText(text: string) {
    const response = await this.client.embed({
      model: process.env.OLLAMA_EMBEDDING_MODEL || "embeddinggemma:latest",
      input: text,
    });
    return response.embeddings[0];
  }

  public async generateResponse(prompt: string, options?: Record<string, any>) {
    const response = await this.client.chat({
      model: process.env.OLLAMA_MODEL || "deepseek-r1:14b",
      messages: [{ role: "user", content: prompt }],
      stream: false,
      ...options,
      think: false,
    });
    return response;
  }

  async generateStreamedResponse(
    prompt: string,
    options?: Record<string, any>,
  ) {
    const response = await this.client.chat({
      model: process.env.OLLAMA_MODEL || "deepseek-r1:14b",
      messages: [{ role: "user", content: prompt }],
      stream: true,
      ...options,
    });
    return response;
  }

  async generateWithCollection(prompt: string, options?: Record<string, any>) {
    const queryEmbedding = await this.embedText(prompt);
    const collection = ChromaService.getInstance().getCollection();

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 3,
    });

    console.log(results)

    const response = await this.generateResponse(
      `You are an assistant that answers using the context below. 
Context:
${results.documents.join("\n---\n")}
Question: ${prompt}
Answer clearly using only relevant information.`,
      {
        ...options,
      },
    );

    return response;
  }
}

export default OllamaClient;
