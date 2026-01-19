import { z } from "zod";
import { zObjectId } from ".";

// Create
const createSchema = z.object({});

// Update
const updateSchema = z.object({
  ragDocumentId: zObjectId,
});

// Delete
const deleteSchema = z.object({
  ragDocumentId: zObjectId,
});

// Restore
const restoreSchema = z.object({
  ragDocumentId: zObjectId,
});

// Get
const getSchema = z.object({
  ragDocumentIds: z.array(zObjectId),
  fields: z.array(z.enum(["_id"], "invalid-field")).optional(),
});

// List
const listSchema = z.object({
  count: z.number().min(1, "count-too-low"),
  page: z.number().min(0, "page-too-low"),
  includeDeleted: z.boolean().optional(),
  search: z
    .object({
      query: z.string().min(1, "query-too-short"),
      searchIn: z.array(z.enum(["name"], "invalid-search-field")),
    })
    .optional(),
  fields: z
    .array(z.enum(["_id", "metadata", "name", "description"], "invalid-field"))
    .optional(),
  populate: z.array(z.literal("metadata"), "invalid-populate-path").optional(),
});

export {
  createSchema,
  updateSchema,
  deleteSchema,
  getSchema,
  restoreSchema,
  listSchema,
};
