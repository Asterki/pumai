import express from "express";

import createHandler from "../controllers/accounts/create";
import getHandler from "../controllers/accounts/get";
import listHandler from "../controllers/accounts/list";
import updateHandler from "../controllers/accounts/update";
import deleteHandler from "../controllers/accounts/delete";
import restoreHandler from "../controllers/accounts/restore";

import { validateRequestBody } from "../middleware/validationMiddleware";
import {
  ensureAuthenticated,
  ensurePermissions,
} from "../middleware/authMiddleware";

const router = express.Router();

// Import the schemas and types
import {
  createAccountSchema,
  deleteAccountSchema,
  getAccountsSchema,
  updateAccountSchema,
  listAccountsSchema,
} from "../../../shared/schemas/accounts";

// Apply global middlewares
router.use(ensureAuthenticated);

// Routes with their schemas
router.post(
  "/create",
  ensurePermissions(["accounts:create"]),
  validateRequestBody(createAccountSchema),
  createHandler,
);

router.post(
  "/update",
  ensurePermissions(["accounts:update"]),
  validateRequestBody(updateAccountSchema),
  updateHandler,
);

router.post(
  "/delete",
  ensurePermissions(["accounts:delete"]),
  validateRequestBody(deleteAccountSchema),
  deleteHandler,
);

router.post(
  "/restore",
  ensurePermissions(["accounts:restore"]),
  validateRequestBody(deleteAccountSchema),
  restoreHandler,
);

router.post("/get", validateRequestBody(getAccountsSchema), getHandler);

router.post("/list", validateRequestBody(listAccountsSchema), listHandler);

export default router;
