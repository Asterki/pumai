import { ResponseStatus } from "../../models";

export type GenerateRequestBody = {
  prompt: string;
};

// Response types
export interface GenerateResponseData {
  status: ResponseStatus;
  result: string;
}
