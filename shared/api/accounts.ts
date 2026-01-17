import type { IAccount } from "../models/account";
import { ResponseStatus } from ".";
import { z } from "zod";

import {
  createAccountSchema,
  deleteAccountSchema,
  getAccountsSchema,
  updateAccountSchema,
  listAccountsSchema,
} from "../schemas/accounts";

// Inferred types from Zod schemas
export type GetRequestBody = z.infer<typeof getAccountsSchema>;
export type CreateRequestBody = z.infer<typeof createAccountSchema>;
export type DeleteRequestBody = z.infer<typeof deleteAccountSchema>;
export type UpdateRequestBody = z.infer<typeof updateAccountSchema>;
export type ListRequestBody = z.infer<typeof listAccountsSchema>;
export type RestoreRequestBody = z.infer<typeof deleteAccountSchema>;

// Response types

export interface GetResponseData {
  status: ResponseStatus;
  accounts?: IAccount[];
}

export interface ListResponseData {
  status: ResponseStatus;
  accounts?: IAccount[];
  totalAccounts?: number;
}

export interface DeleteResponseData {
  status:
    | ResponseStatus
    | "account-not-found"
    | "cannot-delete-self"
    | "cannot-delete-due-to-role-level";
  account?: IAccount;
}

export interface RestoreResponseData {
  status: ResponseStatus | "account-not-found";
  account?: IAccount;
}

export interface CreateResponseData {
  status:
    | ResponseStatus
    | "role-not-found"
    | "email-in-use"
    | "role-cannot-be-assigned";
  account?: IAccount;
}

export interface UpdateResponseData {
  status:
    | ResponseStatus
    | "account-not-found"
    | "role-not-found"
    | "role-cannot-be-assigned"
    | "email-in-use";
  account?: IAccount;
}
