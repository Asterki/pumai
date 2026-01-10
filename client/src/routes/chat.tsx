import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Input,
  Button,
  Spin,
  message as antdMessage,
  Modal,
  Select,
  Checkbox,
} from "antd";
import { FaPaperPlane } from "react-icons/fa";

import AIFeature, { ChatMessage } from "../features/ai";
import GeneralLayout from "../layouts/General";

export const Route = createFileRoute("/chat")({
  component: Page,
});

function Page() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      source: "api",
      role: "assistant",
      content: "Hola 👋 ¿en qué puedo ayudarte hoy?",
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages come in
  React.useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      source: "local",
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // const result = await AIFeature.api.generateStream({
      //   prompt: trimmed,
      // });
      // const stream = result
      //
      // // @ts-ignore
      // stream.on("data", (chunk: any) => {
      //   console.log("chunk", chunk.toString())
      // })

      const result = await AIFeature.api.generate({
        prompt: trimmed,
        chat: messages,
      });
      if (result.status === "success") {
        setMessages((prev) => [
          ...prev,
          {
            source: "api",
            role: "assistant",
            content: result.result,
            timestamp: Date.now(),
          },
        ]);
      } else {
        antdMessage.error("Error generando respuesta del modelo.");
      }

      // const stream = false;
      // if (stream && stream instanceof ReadableStream) {
      //   console.log("result", result);
      //   let aiText = "";
      //   const reader = stream.getReader();
      //
      //   while (true) {
      //     const { value, done } = await reader.read();
      //     if (done) break;
      //     const chunk = new TextDecoder().decode(value);
      //     aiText += chunk;
      //
      //     setMessages((prev) => {
      //       const copy = [...prev];
      //       const last = copy[copy.length - 1];
      //       if (last.role === "assistant") last.content = aiText;
      //       else
      //         copy.push({
      //           role: "assistant",
      //           source: "api",
      //           content: aiText,
      //           timestamp: Date.now(),
      //         });
      //       return copy;
      //     });
      //   }
      // } else {
      // }
    } catch (err) {
      console.error(err);
      antdMessage.error("Error al comunicar con el modelo AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralLayout selectedPage="chat">
      <div className="relative flex flex-col h-[90vh] rounded-xl overflow-hidden text-white">
        {/* Chat messages */}
        <div
          ref={containerRef}
          className="flex flex-col gap-4 p-6 md:px-40 overflow-y-auto flex-1 relative z-10 scrollbar-thin scrollbar-thumb-gray-700/50"
        >
          {messages.map((msg, i) => (
            <AIFeature.components.MessageComponent key={i} {...msg} />
          ))}

          {loading && (
            <div className="flex justify-center py-4">
              <Spin tip="Pensando..." />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="relative z-10 border-t border-white/10 bg-white/10 backdrop-blur-xl p-4 flex items-end gap-3">
          <Input.TextArea
            autoSize={{ maxRows: 6 }}
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            classNames={{
              textarea:
                "bg-transparent dark:text-white placeholder:text-neutral-400 border-none focus:ring-0 resize-none",
            }}
          />
          <Button
            type="primary"
            icon={<FaPaperPlane />}
            loading={loading}
            onClick={sendMessage}
            className="!bg-blue-500 hover:!bg-blue-600 rounded-full px-5 py-2 font-medium shadow-lg"
          >
            Enviar
          </Button>
        </div>
      </div>

      <p className="mt-2 text-center text-sm dark:text-gray-400">
        La información proporcionada por este chat AI es solo para fines
        informativos. Por favor, verifica cualquier dato crítico con fuentes
        oficiales.
      </p>
    </GeneralLayout>
  );
}
