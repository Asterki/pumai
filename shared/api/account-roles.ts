import type { IAccountRole } from "../models/account-role";
import { ResponseStatus } from ".";
import { z } from "zod";

import {
  createAccountRoleSchema,
  deleteAccountRoleSchema,
  getAccountRolesSchema,
  updateAccountRoleSchema,
  listAccountRolesSchema,
  restoreAccountRoleSchema,
} from "../schemas/account-roles";

// Inferred request body types
export type GetRequestBody = z.infer<typeof getAccountRolesSchema>;
export type CreateRequestBody = z.infer<typeof createAccountRoleSchema>;
export type DeleteRequestBody = z.infer<typeof deleteAccountRoleSchema>;
export type RestoreRequestBody = z.infer<typeof restoreAccountRoleSchema>;
export type UpdateRequestBody = z.infer<typeof updateAccountRoleSchema>;
export type ListRequestBody = z.infer<typeof listAccountRolesSchema>;

// Response types
export interface GetResponseData {
  status: ResponseStatus;
  accountRoles?: IAccountRole[];
}

export interface ListResponseData {
  status: ResponseStatus;
  accountRoles?: IAccountRole[];
  totalAccountRoles?: number;
}

export interface DeleteResponseData {
  status: ResponseStatus | "role-not-found";
  accountRole?: IAccountRole;
}

export interface RestoreResponseData {
  status: ResponseStatus | "role-not-found";
  accountRole?: IAccountRole;
}

export interface CreateResponseData {
  status: ResponseStatus | "level-in-use" | "level-too-high";
  accountRole?: IAccountRole;
}

export interface UpdateResponseData {
  status: ResponseStatus | "level-in-use" | "level-too-high" | "role-not-found";
  accountRole?: IAccountRole;
}
