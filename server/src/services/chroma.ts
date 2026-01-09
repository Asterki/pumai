import fs from "fs";
import path from "path";
import { ChromaClient, Collection } from "chromadb";

import OllamaEmbeddingService from "./ollama/embed";

class ChromaService {
  private readonly docsDir: string = path.resolve("./data/rag-documents");
  private client: ChromaClient = new ChromaClient({});
  private collection: Collection | null = null;

  private static instance: ChromaService | null = null;

  public static getInstance() {
    if (!ChromaService.instance) ChromaService.instance = new ChromaService();
    return ChromaService.instance;
  }

  constructor() {
    this.loadFilesToCollection();
  }

  public getClient() {
    return this.client;
  }

  public getCollection() {
    return this.collection;
  }

  public deleteCollection() {
    return this.client.deleteCollection({ name: "rag-documents" });
  }

  private async loadFilesToCollection() {
    this.collection = await this.client.getOrCreateCollection({
      name: "rag-documents",
      embeddingFunction: OllamaEmbeddingService.getInstance().getEmbedder(),
    });

    for (const file of fs.readdirSync(this.docsDir)) {
      if (!file.endsWith(".txt")) continue;

      const filePath = path.join(this.docsDir, file);
      const text = fs.readFileSync(filePath, "utf8");

      // Create an embedding for the file content
      const embedding =
        await OllamaEmbeddingService.getInstance().embedText(text);

      await this.collection.add({
        ids: [file],
        embeddings: [embedding],
        documents: [text],
      });
    }

    console.log(
      "[ChromaDB] All documents have been embedded and added to the collection.",
    );
  }
}

export default ChromaService;
