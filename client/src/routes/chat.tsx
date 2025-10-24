import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";

import { Button, Menu, Input, UploadFile, Image } from "antd";

import StatusFeature from "../features/status";
import ChatFeature from "../features/chat";

import GeneralLayout from "../layouts/General";
import { FaChartLine, FaLink, FaPaperPlane } from "react-icons/fa";

export const Route = createFileRoute("/chat")({
  component: Page,
});

function Page() {
  return (
    <GeneralLayout selectedPage="chat">
      <div className="flex flex-col w-full min-h-screen">
        <div className="h-[90vh] flex flex-col items-center w-full">
          <div className="flex flex-col gap-2 h-11/12 overflow-y-scroll w-full md:w-7/12">
            <ChatFeature.components.MessageComponent
              source="api"
              content="ewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewqeqwewjqieowqjeoqwiejqwoieqwje"
              role="user"
            />

            <ChatFeature.components.MessageComponent
              source="local"
              content="ewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjewqeqwewjqieowqjeoqwiejqwoieqwjeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewqeqwewjqieowqjeoqwiejqwoieqwje"
              role="user"
            />

          </div>

          <div className="flex flex-col mb-4 w-full gap-4 items-center justify-center dark:border-neutral-700 border rounded-lg p-4 bg-neutral-900 shadow-md">
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
      </div>
    </GeneralLayout>
  );
}
