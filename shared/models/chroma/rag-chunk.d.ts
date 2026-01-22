import {
  CampusCode,
  DocumentCategory,
  DeliveryMode,
  SourceType,
} from "./index";

export interface IRAGChunk {
  chunkId: string; // deterministic: `${docId}:${chunkIndex}`
  chunkIndex: number; // Several chunks for the same document
  docId: string; // Original document docId

  content: string;

  category: DocumentCategory;
  authorityLevel: number;

  campuses: string; // CampusCode[]
  deliveryModes: string; // DeliveryMode[]

  effectiveFrom: string; // ISO string
  effectiveUntil: string; // ISO string or null
  archived: boolean;

  warnings: string; // JSON stringified
}
