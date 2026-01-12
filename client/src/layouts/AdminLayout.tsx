import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import {
  FaBars,
  FaBug,
  FaCube,
  FaCubes,
  FaInbox,
  FaProjectDiagram,
  FaTachometerAlt,
  FaTerminal,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { IoMdCube } from "react-icons/io";

import {
  Button,
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  Spin,
  Tour,
  theme,
} from "antd";
import esES from "antd/locale/es_ES";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import AuthFeature from "../features/auth/";

import ConfigFeature from "../features/config/";
import type { RootState } from "../store";
import type { TourProps } from "antd/lib";
import type { MenuItemType } from "antd/es/menu/interface";
import type { IAccountRole } from "../features/roles";

import type { Permission } from "../../../shared/types/permissions";

const { Header, Sider, Content, Footer } = Layout;

interface LayoutProps {
  children: React.ReactNode;
  selectedPage?: string;
}

export default function PageLayout({ children, selectedPage }: LayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof import("../store").store.dispatch>();

  const { t } = useTranslation(["layouts"], { keyPrefix: "admin" });

  const { account } = useSelector((state: RootState) => state.auth);
  const { config } = useSelector((state: RootState) => state.config);

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (!account) {
      (async () => {
        const result = await dispatch(AuthFeature.actions.fetch());

        if (
          AuthFeature.actions.fetch.rejected.match(result) ||
          result.payload.status === "unauthenticated"
        ) {
          navigate({ to: "/auth/login" });
        }
      })();
    }
  }, [account]);

  useEffect(() => {
    if (!config) dispatch(ConfigFeature.actions.fetchConfig());

    // if (!config?.masterServer.enabled) navigate({ to: '/nodes/register' })
  }, [config]);

  const [tourOpen, setTourOpen] = useState(true);
  const sidebarRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const steps: TourProps["steps"] = [
    {
      title: t("dashboard:tours.welcome.step1.title"),
      description: t("dashboard:tours.welcome.step1.content"),
      cover: (
        <div className="flex items-center justify-center">
          <img src="/logo.png" className="max-w-32 animate-bounce" />
        </div>
      ),
    },
    {
      title: t("dashboard:tours.welcome.step2.title"),
      description: t("dashboard:tours.welcome.step2.content"),
      scrollIntoViewOptions: {
        inline: "start",
        behavior: "smooth",
        block: "end",
      },
      placement: "right",
      type: "primary",

      target: () => sidebarRef.current,
    },
    {
      title: t("dashboard:tours.welcome.step3.title"),
      description: t("dashboard:tours.welcome.step3.content"),
      scrollIntoViewOptions: { behavior: "smooth", block: "center" },
      closable: false,
      placement: "right",
      type: "primary",
      target: () => settingsButtonRef.current,
    },
  ];

  const hasPermission = (permission: Permission): boolean => {
    if (account) {
      if (
        (account.data.role as IAccountRole).permissions.includes(permission) ||
        (account.data.role as IAccountRole).permissions.includes("*")
      )
        return true;
      return false;
    }
    return false;
  };

  const menuItems: Array<MenuItemType> = [
    // === Overview & Core ===
    {
      key: "dashboard",
      label: <Link to="/dashboard">{t("sidebar.index")}</Link>,
      icon: <FaTachometerAlt />, // Better for dashboards
    },
    {
      key: "nodes",
      label: <Link to="/dashboard/nodes">{t("sidebar.nodes")}</Link>,
      icon: <FaCubes />, // Better for dashboards
    },
    {
      key: "conflicts",
      label: <Link to="/">{t("sidebar.conflicts")}</Link>,
      icon: <FaProjectDiagram />, // Better for dashboards
    },
    {
      key: "events",
      label: <Link to="/">{t("sidebar.events")}</Link>,
      icon: <FaInbox />, // Better for dashboards
    },
    {
      key: "accounts",
      label: <Link to="/">{t("sidebar.accounts")}</Link>,
      icon: <FaUsers />,
      style: {
        display: hasPermission("accounts:read") ? "block" : "none",
      },
    },
    {
      key: "roles",
      label: <Link to="/">{t("sidebar.roles")}</Link>,
      icon: <FaUserShield />,
      style: {
        display: hasPermission("account-roles:read") ? "block" : "none",
      },
    },
    {
      key: "logs",
      label: <Link to="/">{t("sidebar.logs")}</Link>,
      icon: <FaTerminal />, // Better for dashboards
    },
  ];

  const isDark = account?.preferences.general.theme === "dark";

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : undefined,
      }}
    >
      <Layout className={`${isDark ? "dark" : ""} min-h-screen`}>
        {/* Top Navbar */}
        <Header
          className="px-4 flex items-center justify-between bg-white dark:bg-neutral-800"
          style={{ paddingInline: 16 }}
        >
          <Button
            type="text"
            icon={<FaBars />}
            onClick={() => setDrawerVisible(true)}
            className="md:hidden text-xl"
          />
          <h1 className="text-lg font-semibold text-black dark:text-white">
            {t("dashboard:sidebar.title")}
          </h1>
        </Header>

        <Layout hasSider>
          {/* Sidebar for desktop */}
          <Sider
            breakpoint="md"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="hidden md:block"
            theme={isDark ? "dark" : "light"}
            width={220}
            ref={sidebarRef}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedPage || "dashboard"]}
              items={menuItems}
              className="h-full"
            />
          </Sider>

          {/* Sidebar Drawer for mobile */}
          <Drawer
            title="Menú"
            placement="left"
            // This code is responsible for opening and closing the drawer menu in a mobile device. It's controlled by 'setDrawerVisible' function which sets 'drawerVisible' state variable to true or false.
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedPage || "dashboard"]}
              items={menuItems}
              onClick={() => setDrawerVisible(false)}
            />
          </Drawer>

          {/* Main Content */}
          <Layout style={{ background: "transparent" }}>
            <Content className="p-6 dark:text-white">
              {account && children}
              {!account && (
                <div className="text-center text-lg text-gray-500">
                  <Spin size="large" />
                </div>
              )}
            </Content>
            <Footer className="text-center bg-white dark:bg-neutral-800 dark:text-white">
              © {new Date().getFullYear()} Asterki MiApps
            </Footer>
          </Layout>
        </Layout>
      </Layout>

      {/* Tour Component, Trigger only if local storage cookie is set to new user or if user request it */}
      <Tour
        open={!tourOpen}
        onClose={() => {
          setTourOpen(false);
        }}
        steps={steps}
      />
    </ConfigProvider>
  );
}
