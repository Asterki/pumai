import { z } from "zod";

const generateSchema = z.object({
  prompt: z.string().min(1, "prompt-too-short").max(5000, "prompt-too-long"),
});
export { generateSchema };
