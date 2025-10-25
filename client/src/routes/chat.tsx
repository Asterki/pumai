import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button, Menu, Input, UploadFile, Image } from "antd";

import StatusFeature from "../features/status";
import AIFeature, { ChatMessage } from "../features/ai";

import GeneralLayout from "../layouts/General";
import { FaChartLine, FaLink, FaPaperPlane } from "react-icons/fa";

export const Route = createFileRoute("/chat")({
  component: Page,
});

function Page() {
  const [currentMessages, setCurrentMessages] = React.useState<ChatMessage[]>([
    {
      source: "api",
      content: "Hola, ¿en qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: Date.now(),
    },
  ]);

  const sendMessage = async (message: string) => {
    const newMessage: ChatMessage = {
      source: "local",
      content: message,
      role: "user",
      timestamp: Date.now(),
    };

    setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);

    const result = await AIFeature.api.generate({ prompt: message });
    if (result.status === "success") {
      const aiMessage: ChatMessage = {
        source: "api",
        content: result.result,
        role: "assistant",
        timestamp: Date.now(),
      };
      setCurrentMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  };

  return (
    <GeneralLayout selectedPage="chat">
      <div className="flex flex-col w-full">
        <div className="relative flex flex-col items-center w-full mx-auto h-[90vh] rounded-lg overflow-hidden">
          {/* Chat messages */}
          <div className="flex flex-col gap-2 overflow-y-auto pb-32 w-full md:px-[15vw] px-4">
            {currentMessages.map((message, index) => (
              <AIFeature.components.MessageComponent
                key={index}
                source={message.source}
                content={message.content}
                role={message.role}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 bg-neutral-900 rounded-lg border border-neutral-700 flex flex-col gap-2">
            <Input.TextArea
              rows={4}
              autoSize={{
                maxRows: 8,
                minRows: 1,
              }}
              variant="borderless"
              styles={{ textarea: { padding: "10px" } }}
              placeholder="Pregunta cualquier cosa..."
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  const message = target.value.trim();
                  if (message) {
                    sendMessage(message);
                    target.value = "";
                  }
                }
              }}
            />

            <div className="flex items-center gap-2 w-full justify-end">
              <Button icon={<FaLink />} />
              <Button icon={<FaChartLine />} />
              <Button icon={<FaPaperPlane />} type="primary">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </GeneralLayout>
  );
}
