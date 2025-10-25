import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import {
  FaCashRegister,
  FaBoxes,
  FaWarehouse,
  FaReceipt,
  FaUndo,
  FaBars,
  FaMoneyCheckAlt,
  FaUsers,
  FaUserShield,
  FaServer,
  FaBookOpen,
  FaScroll,
  FaPercentage,
  FaBell,
  FaExchangeAlt,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaUtensils,
  FaClipboardList,
  FaFileInvoice,
  FaTicketAlt,
  FaUserFriends,
  FaBrain,
  FaShoppingCart,
  FaTruckLoading,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaChartBar,
  FaStore,
  FaIdBadge,
  FaCog,
  FaRegCheckCircle,
  FaCube,
  FaStarHalf,
  FaRobot,
  FaQuestionCircle,
} from "react-icons/fa";

import {
  ConfigProvider,
  theme,
  Layout,
  Menu,
  Drawer,
  Button,
  Spin,
} from "antd";
const { Header, Sider, Content, Footer } = Layout;
import esES from "antd/locale/es_ES";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { unwrapResult } from "@reduxjs/toolkit";

import { useTranslation } from "react-i18next";
import { MenuItemType } from "antd/es/menu/interface";

interface LayoutProps {
  children: React.ReactNode;
  selectedPage?: string;
}

export default function PageLayout({ children, selectedPage }: LayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof import("../store").store.dispatch>();

  const { t } = useTranslation(["main"]);

  const { status: serverConnectionStatus } = useSelector(
    (state: RootState) => state.status,
  );

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems: MenuItemType[] = [
    // === Overview & Core ===
    {
      key: "chat",
      label: <Link to="/chat">{t("dashboard:sidebar.chat")}</Link>,
      icon: <FaRobot />,
    },
    {
      key: "about",
      label: <Link to="/about">{t("dashboard:sidebar.about")}</Link>,
      icon: <FaQuestionCircle />, // Better for dashboards
    },
  ];

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout className={`dark`}>
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
            theme={"dark"}
            width={220}
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
            <Content className="p-6 bg-white dark:bg-neutral-800 dark:text-white dark:border-neutral-700 border">
              <div className="fixed top-0 left-0 z-0 w-full overflow-hidden">
                {/* <img */}
                {/*   src="/assets/img/sol-cut.png" */}
                {/*   className="opacity-5 grayscale absolute top-0 left-0 w-full h-full object-cover" */}
                {/*   alt="" */}
                {/* /> */}
              </div>

              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
