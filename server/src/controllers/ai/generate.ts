import { Response, NextFunction } from "express";

import { TypedRequest } from "../../types";
import * as AIAPITypes from "../../../../shared/types/api/ai";

import OllamaChatService from "../../services/ollama/chat";
import OllamaEmbeddingService from "../../services/ollama/embed";
import { ChatResponse } from "ollama";

const handler = async (
  req: TypedRequest<AIAPITypes.GenerateRequestBody>,
  res: Response<AIAPITypes.GenerateResponseData>,
  _next: NextFunction,
) => {
  // TODO: Expand this
  const { prompt } = req.parsedBody;

  const context = await OllamaEmbeddingService.getInstance().getContext(prompt);
  const finalPrompt = OllamaChatService.getInstance().getFinalPrompt(
    context.documents.join("\n"),
    prompt,
  );

  const result: ChatResponse = await OllamaChatService.getInstance().generateChat<ChatResponse>(
    finalPrompt,
    [],
    false,
    { temperature: 0.2 },
  );

  res.status(200).json({ status: "success", result: result.message.content });
};

export default handler;
