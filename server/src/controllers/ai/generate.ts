import { Request, Response, NextFunction } from "express";

import { TypedRequest } from "../../types";
import * as AIAPITypes from "../../../../shared/types/api/ai";

import OllamaService from "../../services/ollama";

const handler = async (
  req: TypedRequest<AIAPITypes.GenerateRequestBody>,
  res: Response<AIAPITypes.GenerateResponseData>,
  _next: NextFunction,
) => {
  const result = await OllamaService.getInstance().generateWithCollection(
    req.parsedBody.prompt,
  );

  res.status(200).json({ status: "success", result: result.message.content });
};

export default handler;
