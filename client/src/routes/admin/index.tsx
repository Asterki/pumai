import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Layout, Typography } from "antd";
const { Title, Paragraph } = Typography;
const { Content } = Layout;

import type { RootState } from "../../store";

import AuthFeature from "../../features/auth/";
import AdminPageLayout from "../../layouts/Admin";
import type { IAccountRole } from "../../features/roles";

import type { Permission } from "../../../../shared/types/permissions";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof import("../../store").store.dispatch>();
  const { account } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation(["dashboard"], { keyPrefix: "index" });

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

  const greeting =
    new Date().getHours() < 12
      ? t("dashboard:index.greetings.morning")
      : new Date().getHours() < 18
        ? t("dashboard:index.greetings.afternoon")
        : t("dashboard:index.greetings.evening");

  return (
    <AdminPageLayout>
      <Content style={{ padding: "24px" }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          {t("welcome")}
        </Title>
        <Paragraph>{t("description")}</Paragraph>
        And then just a bunch of statistic cards and stuff like that.
      </Content>
    </AdminPageLayout>
  );
}
