import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import esES from "antd/locale/es_ES";
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
  Tooltip,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
const { Header, Sider, Content } = Layout;
import {
  FaBars,
  FaRobot,
  FaQuestionCircle,
  FaCircle,
  FaFolder,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";

import PreferencesFeature from "../features/preferences";

interface LayoutProps {
  children: React.ReactNode;
  selectedPage?: string;
}

export default function GeneralLayout({
  children,
  selectedPage = "chat",
}: LayoutProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(["main"]);

  // Connection status
  const { status: serverConnectionStatus } = useSelector(
    (state: RootState) => state.status,
  );
  // serverConnectionStatus === "succeeded" means connected
  const isConnected = serverConnectionStatus === "succeeded";

  // Preferences
  const {
    savePreferences,
    state: preferencesModalState,
    setState: setPreferencesModalState,
  } = PreferencesFeature.hooks.usePreferencesModal({
    onSuccess: () => {
      // Reload the page to apply new preferences
      window.location.reload();
    },
  });

  // Sidebar / drawer
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "preferences") {
      setPreferencesModalState((prev) => ({ ...prev, isOpen: true }));
      setDrawerVisible(false);
      return;
    }

    // For named routes that map 1:1 to menu keys
    navigate({ to: `/${key}` });
    setDrawerVisible(false);
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "chat",
        icon: <FaRobot />,
        label: t("dashboard:sidebar.chat") || "Chat",
      },
      {
        key: "preferences",
        icon: <FaBars />,
        label: t("dashboard:sidebar.preferences") || "Preferencias",
      },
      {
        key: "docrepo",
        icon: <FaFolder />,
        // keep the original text, but we navigate centrally on click
        label: t("dashboard:sidebar.docrepo") || "Repositorio de Documentos",
      },
      {
        key: "about",
        icon: <FaQuestionCircle />,
        label: t("dashboard:sidebar.about") || "Acerca de",
      },
    ],
    [t],
  );

  // Sidebar component reused between Sider and Drawer
  const SidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedPage]}
      items={items}
      onClick={handleMenuClick}
      style={{
        background: "transparent",
        borderRight: "none",
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
      <PreferencesFeature.components.PreferencesModal
        state={preferencesModalState}
        setState={setPreferencesModalState}
        savePreferences={savePreferences}
      />

      <Layout style={{ minHeight: "100vh", background: "#0d0d0d" }}>
        {/* HEADER */}
        <Header
          style={{
            background: "#141414",
            borderBottom: "1px solid #222",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: 16,
            height: 64,
          }}
          className="z-10"
        >
          <Space align="center" size="middle">
            {/* Mobile menu button */}
            <Button
              type="text"
              icon={<FaBars />}
              onClick={() => setDrawerVisible(true)}
              aria-label="Abrir menú"
              className="md:hidden block text-lg"
            />

            {/* Brand / Title */}
            <Link
              to="/chat"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0f2a66",
                }}
                aria-hidden
              >
                <Avatar
                  size={28}
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    boxShadow: "none",
                  }}
                >
                  AI
                </Avatar>
              </div>

              <div style={{ lineHeight: 1 }}>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                  }}
                >
                  Pum
                  <span
                    aria-hidden
                    style={{
                      marginLeft: 6,
                      background:
                        "linear-gradient(90deg,#00f5ff 0%,#0084ff 25%,#7b2ff7 50%,#ff00d4 75%,#00f5ff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontFamily: "monospace",
                    }}
                  >
                    AI
                  </span>
                </Typography.Title>
                <div style={{ color: "#9aa4b2", fontSize: 12, marginTop: 2 }}>
                  {t(`dashboard:sidebar.${selectedPage}`) || ""}
                </div>
              </div>
            </Link>
          </Space>

          <Space align="center" size="small" style={{ gap: 12 }}>
            <Tooltip title={isConnected ? "Conexión estable" : "Sin conexión"}>
              <Tag
                color={isConnected ? "green" : "red"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: 999,
                }}
                aria-label={isConnected ? "Conectado" : "Desconectado"}
              >
                <Space align="center" size={6}>
                  <FaCircle
                    size={8}
                    className={isConnected ? "animate-pulse" : undefined}
                  />
                  <span style={{ fontWeight: 600, color: "#fff" }}>
                    {isConnected ? "Conectado" : "Desconectado"}
                  </span>
                </Space>
              </Tag>
            </Tooltip>

            <Tooltip title="Preferencias">
              <Avatar
                style={{
                  backgroundColor: "#1677ff",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setPreferencesModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                  }))
                }
                aria-label="Abrir preferencias"
              >
                AI
              </Avatar>
            </Tooltip>
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
              paddingTop: 8,
            }}
          >
            <div
              style={{
                padding: "20px 16px",
                textAlign: "center",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography.Title
                level={4}
                style={{ margin: 0, color: "#e8e8e8" }}
              >
                <span style={{ fontWeight: 800 }}>Pum</span>
                <span
                  aria-hidden
                  style={{
                    marginLeft: 6,
                    background:
                      "linear-gradient(90deg,#00f5ff 0%,#0084ff 25%,#7b2ff7 50%,#ff00d4 75%,#00f5ff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  AI
                </span>
              </Typography.Title>
            </div>

            <div style={{ padding: "12px 8px", flex: 1, overflow: "auto" }}>
              {SidebarMenu}
            </div>

            <div style={{ padding: 12, opacity: 0.12 }}>
              <img
                src="/assets/img/lucem.png"
                className="grayscale"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </Sider>

          {/* DRAWER (Mobile) */}
          <Drawer
            title="Menú"
            placement="left"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
            style={{ background: "#141414" }}
          >
            <div style={{ padding: 12 }}>{SidebarMenu}</div>
          </Drawer>

          {/* MAIN CONTENT */}
          <Layout style={{ background: "transparent" }}>
            <Content
              style={{
                minHeight: "calc(100vh - 64px)",
                padding: 20,
                background: "transparent",
              }}
            >
              <div
                style={{
                  background: "#0e0e0e",
                  border: "1px solid rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  padding: 18,
                  minHeight: "100%",
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
