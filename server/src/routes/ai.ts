import express, { RequestHandler } from "express";

import generateHandler from "../controllers/ai/generate";

const router = express.Router();
import { validateRequestBody } from "../middleware/validationMiddleware";

// Schemas
import { generateSchema } from "../../../shared/zod-schemas/ai";

// Routes
router.post(
  "/generate",
  validateRequestBody(generateSchema),
  generateHandler as RequestHandler,
);

export default router;
