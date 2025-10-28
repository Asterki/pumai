import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Tag,
  ConfigProvider,
  theme,
  Avatar,
  Space,
} from "antd";
import { FaBars, FaRobot, FaQuestionCircle, FaCircle } from "react-icons/fa";
import esES from "antd/locale/es_ES";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";
import type { MenuItemType } from "antd/es/menu/interface";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
  selectedPage?: string;
}

export default function GeneralLayout({ children, selectedPage }: LayoutProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(["main"]);

  const { status: serverConnectionStatus } = useSelector(
    (state: RootState) => state.status,
  );

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isConnected = serverConnectionStatus !== "succeeded";

  const menuItems: MenuItemType[] = [
    {
      key: "chat",
      label: <Link to="/chat">{t("dashboard:sidebar.chat") || "Chat"}</Link>,
      icon: <FaRobot />,
    },
    {
      key: "settings",
      label: (
        <Link to="/settings">
          {t("dashboard:sidebar.settings") || "Configuración"}
        </Link>
      ),
      icon: <FaBars />,
    },
    {
      key: "docrepo",
      label: (
        <Link to="/docrepo">
          {t("dashboard:sidebar.docrepo") || "Repositorio de Documentos"}
        </Link>
      ),
      icon: <FaBars />,
    },
    {
      key: "about",
      label: (
        <Link to="/about">{t("dashboard:sidebar.about") || "Acerca de"}</Link>
      ),
      icon: <FaQuestionCircle />,
    },
  ];

  const SidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedPage || "chat"]}
      items={menuItems}
      className="border-r-0"
      onClick={({ key }) => {
        navigate({ to: `/${key}` });
        setDrawerVisible(false);
      }}
    />
  );

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          colorBgBase: "#0d0d0d",
          colorTextBase: "#e8e8e8",
          borderRadius: 8,
          fontSize: 15,
        },
      }}
    >
      <Layout className="min-h-screen">
        {/* HEADER */}
        <Header
          style={{
            background: "#141414",
            borderBottom: "1px solid #222",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: 16,
          }}
          className="h-15 z-10"
        >
          <Space align="center">
            <Button
              type="text"
              icon={<FaBars />}
              onClick={() => setDrawerVisible(true)}
              className="md:hidden block text-lg"
            />
            <h1 className="text-lg font-semibold text-white m-0">
              {t(`dashboard:sidebar.${selectedPage}`)}
            </h1>
          </Space>

          <Space align="center" className="flex gap-2 items-center">
            <Tag color={isConnected ? "green" : "red"}>
              <div className="px-2 py-1 flex items-center gap-2">
                <FaCircle size={8} className="animate-pulse" />
                {isConnected ? "Conectado" : "Desconectado"}
              </div>
            </Tag>

            <Avatar
              style={{
                backgroundColor: "#1677ff",
                cursor: "pointer",
              }}
            >
              AI
            </Avatar>
          </Space>
        </Header>

        <Layout hasSider>
          {/* SIDEBAR (Desktop) */}
          <Sider
            theme="dark"
            width={240}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="z-10 hidden md:flex flex-col"
            style={{
              background: "#141414",
              borderRight: "1px solid #222",
            }}
          >
            <div className="font-bold text-2xl py-5 text-center text-gray-300 border-b border-white/10 tracking-wide">
              <h1 className="text-2xl font-bold text-white">
                Pum
                <span className="inline-block bg-linear-to-br bg-[linear-gradient(90deg,#00f5ff_0%,#0084ff_25%,#7b2ff7_50%,#ff00d4_75%,#00f5ff_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient font-mono">
                  AI
                </span>
              </h1>
            </div>

            {SidebarMenu}
            <div className="opacity-10 left-0 overflow-hidden bottom-1/12 absolute">
              <img src="/assets/img/lucem.png" className="grayscale" alt="" />
            </div>
          </Sider>

          {/* DRAWER (Mobile) */}
          <Drawer
            title="Menú"
            placement="left"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
          >
            {SidebarMenu}
          </Drawer>

          {/* MAIN CONTENT */}
          <Layout>
            <Content
              style={{
                minHeight: "calc(100vh - 60px)",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
