import { Table, Space, Dropdown, Button, Tag } from "antd";
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
	t: (key: string) => string;
	accountRoles: { accountRoles: ListAccountRole[]; totalAccountRoles: number };
	accountRolesListState: {
		count: number;
		loading: boolean;
	};
	fetchAccountRoles: (params: { count: number; page: number }) => void;
	accountPermissions: string[]; // current user permissions
	onUpdate: (account: ListAccountRole) => void;
	onDelete: (account: ListAccountRole) => void;
	onRestore: (account: ListAccountRole) => void;
};

export function AccountRolesTable({
	t,
	accountRoles,
	accountRolesListState,
	fetchAccountRoles,
	accountPermissions,
	onUpdate,
	onDelete,
	onRestore,
}: AccountRolesTableProps) {
	return (
		<div className="mt-4">
			<Table
				className="w-full overflow-x-scroll"
				dataSource={accountRoles.accountRoles}
				columns={[
					{
						title: t("dashboard:roles.table.name"),
						key: "name",
						dataIndex: "name",
						render: (_: any, record: ListAccountRole) => (
							<span>
								{record.name}{" "}
								{record.deleted ? (
									<Tag color="red">{t("dashboard:accounts.table.deleted")}</Tag>
								) : (
									""
								)}
							</span>
						),
					},
					{
						title: t("dashboard:roles.table.level"),
						key: "level",
						dataIndex: "level",
					},
					{
						title: t("dashboard:roles.table.totalPermissions"),
						key: "totalPermissions",
						dataIndex: "totalPermissions",
					},
					{
						title: t("dashboard:roles.table.createdAt"),
						key: "createdAt",
						render: (_: any, record: ListAccountRole) => (
							<p>{new Date(record.createdAt).toLocaleDateString()}</p>
						),
					},

					{
						title: t("dashboard:categories.table.actions"),
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
											label: t("dashboard:roles.table.actionButtons.update"),
											icon: <FaPencilAlt />,
											disabled: !canUpdate,
											onClick: () => onUpdate(record),
										},
										{
											key: "delete",
											label: t("dashboard:roles.table.actionButtons.delete"),
											danger: true,
											icon: <FaTrash />,
											disabled: !canDelete,
											onClick: () => onDelete(record),
										},
									]
								: [
										{
											key: "restore",
											label: t("dashboard:roles.table.actionButtons.restore"),
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
											{t("dashboard:categories.table.actionButtons.trigger")}
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
					showSizeChanger: true,
					onShowSizeChange: (current, size) => {
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
