import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Space, Layout, Card, Row, Col, Typography, Button } from "antd";
const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

import {
  FaTachometerAlt,
  FaIdBadge,
  FaPills,
  FaHospitalSymbol,
  FaUsers,
  FaTerminal,
  FaUser,
  FaUserShield,
} from "react-icons/fa";

import type { RootState } from "../../store";

import AuthFeature from "../../features/auth/";
import AdminLayout from "../../layouts/Admin";
import type { MenuItemType } from "antd/es/menu/interface";
import type { IAccountRole } from "../../features/roles";

import type { Permission } from "../../../../shared/types/permissions";
import { TiCalendar } from "react-icons/ti";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof import("../../store").store.dispatch>();
  const { account } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation(["pages"], { keyPrefix: "admin.index" });

  useEffect(() => {
    if (!account) {
      (async () => {
        const result = await dispatch(AuthFeature.actions.fetch());
        if (AuthFeature.actions.fetch.rejected.match(result)) {
          navigate({ to: "/auth/login" });
        }
      })();
    }
  }, [account, dispatch, navigate]);

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
      key: "pharmacy",
      label: (
        <Link to="/pharmacy" className="text-2xl font-bold">
          {t("items.pharmacy")}
        </Link>
      ),
      icon: <FaPills className="text-6xl" />, // Better for dashboards
    },
    {
      key: "preclinic",
      label: (
        <Link to="/pharmacy" className="text-2xl font-bold">
          {t("items.preclinic")}
        </Link>
      ),
      icon: <FaHospitalSymbol className="text-6xl" />, // Better for dashboards
    },

    {
      key: "consulting",
      label: (
        <Link to="/pharmacy" className="text-2xl font-bold">
          {t("items.consulting")}
        </Link>
      ),
      icon: <TiCalendar className="text-6xl" />, // Better for dashboards
    },
    {
      key: "patients",
      label: (
        <Link to="/pharmacy" className="text-2xl font-bold">
          {t("items.patients")}
        </Link>
      ),
      icon: <FaUsers className="text-6xl" />,
    },
    {
      key: "accounts",
      label: (
        <Link to="/dashboard/accounts" className="text-2xl font-bold">
          {t("items.accounts")}
        </Link>
      ),
      icon: <FaUser className="text-6xl" />,
    },
    {
      key: "account-roles",
      label: (
        <Link to="/dashboard/accounts/roles" className="text-2xl font-bold">
          {t("items.account-roles")}
        </Link>
      ),
      icon: <FaUserShield className="text-6xl" />,
    },
    {
      key: "logs",
      label: (
        <Link to="/" className="text-2xl font-bold">
          {t("items.logs")}
        </Link>
      ),
      icon: <FaTerminal className="text-6xl" />, // Better for dashboards
    },
  ];

  const greeting =
    new Date().getHours() < 12
      ? t("greetings.morning")
      : new Date().getHours() < 18
        ? t("index.greetings.afternoon")
        : t("greetings.evening");

  return (
    <AdminLayout>
      <div className="">
        <Title level={2} style={{ marginBottom: 24 }}>
          {greeting}, {account?.profile.name}
        </Title>
        <Paragraph>{t("description")}</Paragraph>

        <div className="flex gap-2 flex-wrap mt-8 items-center justify-center">
          {menuItems.map((item) => (
            <Card key={item.key} hoverable className="w-1/4">
              <Link
                to={item.key === "dashboard" ? "/dashboard" : `/${item.key}`}
              >
                <Row align="middle" gutter={16}>
                  <Col>{item.icon}</Col>
                  <Col>
                    <Text>{item.label}</Text>
                  </Col>
                </Row>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
