import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";

import { Layout, Button, Menu } from "antd";
const { Header, Sider, Content, Footer } = Layout;

import { MessageCirclePlus } from "lucide-react";

import StatusFeature from "../features/status";

import GeneralLayout from "../layouts/General";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <>
      <Header
        className="px-4 flex items-center justify-between bg-white"
        style={{ paddingInline: 16 }}
      >
        <h1 className="text-lg font-semibold text-white">PumAI</h1>
      </Header>

      {/* HERO */}
      <div className="relative h-[70vh] flex flex-col items-center justify-center bg-[#253a69] text-white overflow-hidden">
        <div>
          <img src="/assets/img/puma.png" className="w-64" alt="" />
          <h1 className="text-[100px] font-bold mb-4 text-white">
            Pum
            <span className="inline-block bg-linear-to-br bg-[linear-gradient(90deg,#00f5ff_0%,#0084ff_25%,#7b2ff7_50%,#ff00d4_75%,#00f5ff_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient font-mono">
              AI
            </span>
          </h1>

          <div className="flex items-center justify-center">
            <Button type="primary" size="large" icon={<MessageCirclePlus />}>
              Iniciar
            </Button>
          </div>
        </div>

        <div>
          <img
            src="/assets/img/sol-cut.png"
            className="opacity-5 grayscale invert absolute top-0 left-0 w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="absolute bottom-10 left-10 w-1/4 md:w-1/12">
          <img src="/assets/img/sellos.png" alt="Sellos" />
        </div>

        <div className="absolute bottom-10 right-10 w-1/4 md:w-1/12">
          <img
            src="/assets/img/nuevahistoria.png"
            className="w-64"
            alt="Nueva Historia"
          />
        </div>
      </div>

      <Footer>Creado con ❤️ por Fernando Rivera</Footer>
    </>
  );
}
