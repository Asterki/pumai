import MessageComponent from "./components/Message";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  source: "api" | "local";
  content: string;
  timestamp?: number;
}


export type { ChatMessage };
export default {
  components: {
    MessageComponent,
  },
};
