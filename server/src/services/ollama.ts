import { Ollama } from "ollama";

class OllamaClient {
  private static instance: OllamaClient | null = null;
  private client: Ollama;

  public static getInstance() {
    if (!OllamaClient.instance) OllamaClient.instance = new OllamaClient();
    return OllamaClient.instance;
  }

  constructor() {
    // Initialize the Ollama client with env.OLLAMA_URL
    this.client = new Ollama({
      host: process.env.OLLAMA_URL || "http://localhost:11434",
    });
  }

  public getClient() {
    return this.client;
  }

  public async generateResponse(
    model: string,
    prompt: string,
    options?: Record<string, any>,
  ) {
    const response = await this.client.chat({
      model,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      ...options,
    });
    return response;
  }
}

export default OllamaClient;
