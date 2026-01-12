import express, { RequestHandler } from "express";

import registerHandler from "../controllers/nodes/register";
import testConnectionHandler from "../controllers/nodes/test-connection";

import { validateRequestBody } from "../middleware/validationMiddleware";

import {
  registerSchema,
  testConnectionSchema,
} from "../../../shared/schemas/nodes";

const router = express.Router();

router.post(
  "/register",
  [validateRequestBody(registerSchema)],
  registerHandler as RequestHandler,
);

router.post(
  "/test-connection",
  [validateRequestBody(testConnectionSchema)],
  testConnectionHandler as RequestHandler,
);

export default router;
