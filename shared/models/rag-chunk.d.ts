import {
  CampusCode,
  DocumentCategory,
  DeliveryMode,
  SourceType,
} from "./index";

export interface VectorChunk {
  chunkId: string;
  docId: string;

  chunkIndex: number;
  content: string;

  category: DocumentCategory;
  authorityLevel: number;

  campuses: CampusCode[];
  deliveryModes: DeliveryMode[];

  effectiveFrom: Date;
  effectiveUntil: Date | null;
  archived: boolean;

  warnings: string[]; // flattened warning texts
  tags: string[];

  citation: {
    docId: string;
    chunkIndex: number;
    publicUrl: string;
  };
}
