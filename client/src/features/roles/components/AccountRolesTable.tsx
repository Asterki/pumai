import { Table, Space, Dropdown, Button, Tag } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaPencilAlt,
  FaTrash,
  FaTrashRestore,
  FaEllipsisH,
} from "react-icons/fa";

interface ListAccountRole {
  _id: string;
  name: string;
  level: number;
  totalPermissions: number;
  createdAt: Date;
  deleted: boolean;
}

type AccountRolesTableProps = {
  accountRoles: { accountRoles: ListAccountRole[]; totalAccountRoles: number };
  accountRolesListState: {
    count: number;
    page: number;
    loading: boolean;
  };
  fetchAccountRoles: (params: { count: number; page: number }) => void;
  accountPermissions: string[]; // current user permissions
  onUpdate: (account: ListAccountRole) => void;
  onDelete: (account: ListAccountRole) => void;
  onRestore: (account: ListAccountRole) => void;
};

export function AccountRolesTable({
  accountRoles,
  accountRolesListState,
  fetchAccountRoles,
  accountPermissions,
  onUpdate,
  onDelete,
  onRestore,
}: AccountRolesTableProps) {
  const { t } = useTranslation(["features"], {
    keyPrefix: "account-roles.components.table",
  });

  return (
    <div className="mt-4">
      <Table
        className="w-full overflow-x-scroll"
        dataSource={accountRoles.accountRoles}
        columns={[
          {
            title: t("name"),
            key: "name",
            dataIndex: "name",
            render: (_: any, record: ListAccountRole) => (
              <span>
                {record.name}{" "}
                {record.deleted ? <Tag color="red">{t("deleted")}</Tag> : ""}
              </span>
            ),
          },
          {
            title: t("level"),
            key: "level",
            dataIndex: "level",
          },
          {
            title: t("totalPermissions"),
            key: "totalPermissions",
            dataIndex: "totalPermissions",
          },
          {
            title: t("createdAt"),
            key: "createdAt",
            render: (_: any, record: ListAccountRole) => (
              <p>{new Date(record.createdAt).toLocaleDateString()}</p>
            ),
          },

          {
            title: t("actions"),
            key: "actions",
            fixed: "right",
            render: (_: any, record: ListAccountRole) => {
              const canUpdate =
                accountPermissions.includes("*") ||
                accountPermissions.includes("account-roles:update");
              const canDelete =
                accountPermissions.includes("*") ||
                accountPermissions.includes("account-roles:delete");
              const canRestore =
                accountPermissions.includes("*") ||
                accountPermissions.includes("account-roles:restore");

              const menuItems = !record.deleted
                ? [
                    {
                      key: "update",
                      label: t("actionButtons.update"),
                      icon: <FaPencilAlt />,
                      disabled: !canUpdate,
                      onClick: () => onUpdate(record),
                    },
                    {
                      key: "delete",
                      label: t("actionButtons.delete"),
                      danger: true,
                      icon: <FaTrash />,
                      disabled: !canDelete,
                      onClick: () => onDelete(record),
                    },
                  ]
                : [
                    {
                      key: "restore",
                      label: t("actionButtons.restore"),
                      icon: <FaTrashRestore />,
                      disabled: !canRestore || !record.deleted,
                      className: record.deleted ? "hidden" : "",
                      onClick: () => onRestore(record),
                    },
                  ];

              return (
                <Space>
                  <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button icon={<FaEllipsisH />}>
                      {t("actionButtons.trigger")}
                    </Button>
                  </Dropdown>
                </Space>
              );
            },
          },
        ]}
        pagination={{
          pageSize: accountRolesListState.count,
          total: accountRoles.totalAccountRoles,
          current: accountRolesListState.page + 1,
          showTotal: (total, range) =>
            t("total", {
              total: total,
              range: range[0] + "-" + range[1],
            }),
          showSizeChanger: true,
          onChange: (current, size) => {
            fetchAccountRoles({
              count: size,
              page: current - 1,
            });
          },
        }}
        rowKey="_id"
        loading={accountRolesListState.loading}
      />
    </div>
  );
}
