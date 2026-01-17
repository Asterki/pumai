import { ChatMessage } from "..";
import { FaRobot, FaUser } from "react-icons/fa";

import ReactMarkdown from "react-markdown";

function MessageComponent({ source, content, role }: ChatMessage) {
  const isAI = source === "api";

  return (
    <div
      className={`w-full flex ${
        isAI ? "justify-start" : "justify-end"
      } transition-all duration-300`}
    >
      <div
        className={`flex flex-col max-w-[80%] md:max-w-[70%] ${
          isAI ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`flex items-center gap-2 mb-1 text-xs dark:text-neutral-400 ${
            isAI ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {isAI ? (
            <FaRobot className="text-blue-400" />
          ) : (
            <FaUser className="dark:text-gray-300" />
          )}
          <span>{isAI ? "PumAI" : "Tú"}</span>
        </div>

        <div
          className={`
            px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
            ${
              isAI
                ? "bg-white/10 border border-white/10 dark:text-neutral-100 text-neutral-900 rounded-tl-none"
                : "bg-gradient-to-br from-blue-500 to-blue-400 dark:text-white rounded-tr-none"
            }
            transition-all duration-300
            hover:shadow-lg hover:scale-[1.01]
          `}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
