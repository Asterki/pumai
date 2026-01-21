import { z } from "zod";
import { zObjectId, isoDateString } from ".";

// Create
const createSchema = z
  .object({
    name: z.string().min(1, "name-too-short").max(150, "name-too-long"),
    content: z.string().min(1, "content-too-short").optional(),
    type: z.enum(["file", "text"], "invalid-type"),

    description: z
      .string()
      .min(1, "description-too-short")
      .max(5000, "description-too-long"),

    category: z.enum(
      [
        "regulation",
        "administrative",
        "campus_service",
        "student_life",
        "support",
      ],
      "invalid-category",
    ),

    authorityLevel: z
      .number()
      .int("authority-level-not-integer")
      .min(0, "authority-level-too-low")
      .max(1000, "authority-level-too-high"),

    campuses: z.array(z.string().min(1)).min(1, "campus-required"),

    effectiveFrom: isoDateString,
    effectiveUntil: isoDateString.optional(),

    tags: z
      .array(z.string().min(1).max(50))
      .max(20, "too-many-tags")
      .optional(),

    // File is validated separately (multipart/form-data)
  })
  .refine((data) => (data.type === "text" ? !!data.content : true), {
    message: "content-required-for-text-type",
  });
// .refine(
//   (data) => !data.effectiveUntil || data.effectiveUntil >= data.effectiveFrom,
//   {
//     message: "effective-until-before-effective-from",
//     path: ["effectiveUntil"],
//   },
// );

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
