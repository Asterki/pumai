import fs from "fs";
import path from "path";
import { ChromaClient, Collection } from "chromadb";

import OllamaEmbeddingService from "./ollama/embed";

class ChromaService {
  private readonly docsDir: string = path.resolve("./data/rag-documents");
  private client: ChromaClient = new ChromaClient({
    host: process.env.CHROMA_DB_HOST || "localhost",
    port: process.env.CHROMA_DB_PORT
      ? parseInt(process.env.CHROMA_DB_PORT)
      : 8000,
    ssl: process.env.CHROMA_DB_SSL === "true",
    fetchOptions: {
      keepalive: true,
    },
  });
  private collection: Collection | null = null;

  private static instance: ChromaService | null = null;

  public static getInstance() {
    if (!ChromaService.instance) ChromaService.instance = new ChromaService();
    return ChromaService.instance;
  }

  constructor() {
    this.connect();
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

  private async connect() {
    console.log("[ChromaDB] Connecting to ChromaDB server...");
    // Initialize the Collection
    this.collection = await this.client.getOrCreateCollection({
      name: "rag-documents",
      embeddingFunction: OllamaEmbeddingService.getInstance().getEmbedder(),
    });
    console.log("[ChromaDB] Connected to ChromaDB server.");

    // Uncomment the following code to embed documents from the docsDir

    // await this.deleteCollection();
    // this.collection = await this.client.getOrCreateCollection({
    //   name: "rag-documents",
    //   embeddingFunction: OllamaEmbeddingService.getInstance().getEmbedder(),
    // });
    //
    // for (const file of fs.readdirSync(this.docsDir)) {
    //   if (!file.endsWith(".txt")) continue;
    //   const filePath = path.join(this.docsDir, file);
    //   const text = fs.readFileSync(filePath, "utf8");
    //
    //   // Create an embedding for the file content
    //   const embedding =
    //     await OllamaEmbeddingService.getInstance().embedText(text);
    //
    //   await this.collection.add({
    //     ids: [file],
    //     embeddings: [embedding],
    //     documents: [text],
    //   });
    // }
    //
    // console.log(
    //   "[ChromaDB] All documents have been embedded and added to the collection.",
    // );
  }
}

export default ChromaService;
