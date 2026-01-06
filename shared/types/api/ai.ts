import { ResponseStatus } from "../../models";

export type GenerateRequestBody = {
  prompt: string;
  chat?: { role: "system" | "user" | "assistant"; content: string }[];
};

// Response types
export interface GenerateResponseData {
  status: ResponseStatus;
  result: string;
}
