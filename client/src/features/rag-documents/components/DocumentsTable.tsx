import { Table, Space, Dropdown, Button, Tag } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaPencilAlt,
  FaTrash,
  FaTrashRestore,
  FaEllipsisH,
} from "react-icons/fa";

import type { ListRAGDocument } from "../";

type RagDocumentsTableProps = {
  ragDocuments: { ragDocuments: ListRAGDocument[]; totalRagDocuments: number };
  ragDocumentsListState: {
    count: number;
    page: number;
    loading: boolean;
  };
  fetchRagDocuments: (params: { count: number; page: number }) => void;
  currentAccountPermissions: string[]; // current user permissions
  onUpdate: (doc: ListRAGDocument) => void;
  onDelete: (doc: ListRAGDocument) => void;
  onRestore: (doc: ListRAGDocument) => void;
};

export function RagDocumentsTable({
  ragDocuments,
  ragDocumentsListState,
  fetchRagDocuments,
  currentAccountPermissions,
  onUpdate,
  onDelete,
  onRestore,
}: RagDocumentsTableProps) {
  const { t } = useTranslation(["features"], {
    keyPrefix: "rag-documents.components.table",
  });

  return (
    <div className="mt-4">
      <Table
        className="w-full overflow-x-scroll"
        dataSource={ragDocuments.ragDocuments}
        columns={[
          {
            title: t("name"),
            key: "name",
            dataIndex: "name",
            render: (_: any, record: ListRAGDocument) => (
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
            render: (_: any, record: ListRAGDocument) => (
              <p>{new Date(record.createdAt).toLocaleDateString()}</p>
            ),
          },
          {
            title: t("actions"),
            key: "actions",
            fixed: "right",
            render: (_: any, record: ListRAGDocument) => {
              const canUpdate =
                currentAccountPermissions.includes("*") ||
                currentAccountPermissions.includes("rag-documents:update");
              const canDelete =
                currentAccountPermissions.includes("*") ||
                currentAccountPermissions.includes("rag-documents:delete");
              const canRestore =
                currentAccountPermissions.includes("*") ||
                currentAccountPermissions.includes("rag-documents:restore");

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
          pageSize: ragDocumentsListState.count,
          total: ragDocuments.totalRagDocuments,
          current: ragDocumentsListState.page + 1,
          showTotal: (total, range) =>
            t("total", {
              total: total,
              range: range[0] + "-" + range[1],
            }),
          showSizeChanger: true,
          onChange: (current, size) => {
            fetchRagDocuments({
              count: size,
              page: current - 1,
            });
          },
        }}
        rowKey="_id"
        loading={ragDocumentsListState.loading}
      />
    </div>
  );
}
