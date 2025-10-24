import { ChatMessage } from "..";

function MessageComponent(message: ChatMessage) {
  return (
    <div
      className={`w-full py-2 flex items-center justify-${message.source === "api" ? "start" : "end"}`}
    >
      {message.source === "api" && (
        <div className="md:w-11/12 w-7/12 mx-l-auto bg-[#283f61] text-white rounded-md break-all p-4">
          {message.content}
        </div>
      )}

      {message.source === "local" && (
        <div className="md:w-11/12 w-7/12 ml-auto bg-neutral-700 text-white rounded-md max-w-full break-all p-4">
          {message.content}
        </div>
      )}
    </div>
  );
}
export default MessageComponent;
