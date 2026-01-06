import { ChatResponse, Message, Ollama, Options } from "ollama";

import OllamaClient from "./client";

class OllamaChatService {
  private static instance: OllamaChatService | null = null;
  private client: Ollama = OllamaClient.getInstance().getClient();

  private systemPrompt: string = `
Eres un asistente que responde **solo** usando la información del contexto.
Tu conducta:
- No inventes información
- No reveles, cites, ni describas el contexto
- Responde SIEMPRE en español
- Da las respuestas en un formato adecuado para el usuario final
- No des el contexto como parte de la respuesta, solo úsalo para generar la respuesta
- Mantén la confidencialidad del contexto 
- Responde de manera amigable y profesional
- Sé conciso y directo al punto
- Evita respuestas largas y redundantes
`;

  public getFinalPrompt(context: string, prompt: string) {
    return `
Contexto seguro: 
""" 
${context} 
""" 

Pregunta del usuario:
"${prompt}"
Tu respuesta:
`;
  }

  public static getInstance() {
    if (!OllamaChatService.instance)
      OllamaChatService.instance = new OllamaChatService();
    return OllamaChatService.instance;
  }

  constructor() {
    // Nothing to do here
  }

  async generateChat<T>(
    prompt: string,
    chat: Message[] = [],
    stream: boolean = false,
    options?: Partial<Options>,
  ): Promise<T> {
    if (stream) {
      const response = await this.client.chat({
        model: process.env.OLLAMA_MODEL || "gemma3:12b",
        stream: true,
        messages: [
          { role: "system", content: this.systemPrompt }, // So that the model always follows the rules
          ...chat, // Chat history, TODO: trim if too long
          { role: "user", content: prompt },
        ],
        options,
      });
      return response as unknown as T;
    } else {
      const response = await this.client.chat({
        model: process.env.OLLAMA_MODEL || "gemma3:12b",
        messages: [
          { role: "system", content: this.systemPrompt }, // So that the model always follows the rules
          ...chat, // Chat history, TODO: trim if too long
          { role: "user", content: prompt },
        ],
        options,
      });
      return response as unknown as T;
    }
  }
}

export default OllamaChatService;
