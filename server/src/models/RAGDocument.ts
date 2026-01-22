import mongoose, { Schema } from "mongoose";
import { IRAGDocument } from "../../../shared/models/rag-document";
import metadataSchema from "./Metadata"; // reuse your existing metadata schema

const ragDocumentSchema = new mongoose.Schema<IRAGDocument>(
  {
    docId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    authorityLevel: {
      type: Number,
      required: true,
      index: true,
    },
    sourceType: {
      type: String,
      required: true,
      index: true,
    },
    campuses: {
      type: [String],
      required: true,
      default: ["GLOBAL"],
    },
    deliveryModes: {
      type: [String],
      required: true,
      default: [],
    },
    effectiveFrom: {
      type: Date,
      required: true,
      default: () => new Date(),
      index: true,
    },
    effectiveUntil: {
      type: Date,
      default: null,
      index: true,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    warnings: {
      legal: { type: String, default: undefined },
      timeSensitive: { type: String, default: undefined },
      campusSpecific: { type: String, default: undefined },
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: metadataSchema,
      default: {},
    },
  },
  {
    versionKey: false, // removes __v
    timestamps: true, // automatically adds createdAt and updatedAt
  },
);

const RAGDocumentModel = mongoose.model<IRAGDocument>(
  "RAGDocument",
  ragDocumentSchema,
);

export default RAGDocumentModel;
