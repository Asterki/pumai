import { z } from "zod";

const generateSchema = z.object({
  prompt: z.string().min(1, "prompt-too-short").max(5000, "prompt-too-long"),
  chat: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z
        .string()
        .min(1, "message-content-too-short")
        .max(10000, "message-content-too-long"),
    }),
  ),
});
export { generateSchema };
