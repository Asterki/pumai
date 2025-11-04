import fs from "fs";
import path from "path";
import { ChromaClient } from "chromadb";

import OllamaService from "./ollama";

class ChromaService {
  private readonly docsDir: string = path.resolve("./data/docs");
  private client: ChromaClient = new ChromaClient({});
  private collection: any;

  private static instance: ChromaService | null = null;

  public static getInstance() {
    if (!ChromaService.instance) ChromaService.instance = new ChromaService();
    return ChromaService.instance;
  }

  constructor() {
    this.loadCollections();

    // Create the database in case of not existing
    if (!fs.existsSync("./chroma-database")) {
      fs.mkdirSync("./chroma-database");
    }
  }

  public getClient() {
    return this.client;
  }

  public getCollection() {
    return this.collection;
  }

  private async loadCollections() {
    // Delete the existing collection if it exists
    this.client.deleteCollection({ name: "docs" }).catch(() => {
      // Ignore error if collection does not exist
    });

    this.collection = await this.client.getOrCreateCollection({
      name: "docs",
      embeddingFunction: OllamaService.getInstance().getEmbedder(),
    });

    for (const file of fs.readdirSync(this.docsDir)) {
      if (!file.endsWith(".txt")) continue;

      const filePath = path.join(this.docsDir, file);
      const text = fs.readFileSync(filePath, "utf8");

      console.log(`Embedding: ${file} (${text.length} chars)`);

      // Create an embedding for the file content
      const embedding = await OllamaService.getInstance().embedText(text);

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
