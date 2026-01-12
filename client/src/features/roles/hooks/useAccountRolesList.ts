import { useState, useCallback } from "react";
import { TFunction } from "i18next";
import { MessageInstance } from "antd/es/message/interface";

import AccountRolesFeature, { RolesAPITypes } from "../";

interface ListAccountRole {
	_id: string;
	name: string;
	level: number;
	totalPermissions: number;
	createdAt: Date;
	deleted: boolean;
}

type NullableAccountsListState = {
	[K in keyof RolesAPITypes.ListRequestBody]?:
		| RolesAPITypes.ListRequestBody[K]
		| null;
};

type UseAccountRolesListOptions = {
	t?: TFunction;
	message?: MessageInstance;
	apiList?: typeof AccountRolesFeature.api.list;
};

export function useAccountRolesList({
	t,
	message,
	apiList = AccountRolesFeature.api.list,
}: UseAccountRolesListOptions) {
	const [accountRolesListState, setAccountRolesListState] = useState<
		RolesAPITypes.ListRequestBody & { loading: boolean }
	>({
		loading: true,
		fields: ["metadata", "_id", "name", "permissions", "level"],
		count: 50,
		page: 0,
	});

	const [accountRoles, setAccountRoless] = useState<{
		totalAccountRoles: number;
		accountRoles: ListAccountRole[];
	}>({
		accountRoles: [],
		totalAccountRoles: 0,
	});

	const fetchAccountRoles = useCallback(
		async ({
			count = accountRolesListState.count,
			page = accountRolesListState.page,
			includeDeleted = accountRolesListState.includeDeleted,
			search = accountRolesListState.search,
		}: NullableAccountsListState = {}) => {
			setAccountRolesListState((prev) => ({ ...prev, loading: true }));

			const result = await apiList({
				...accountRolesListState,
				search: search == null ? undefined : search,
				includeDeleted: includeDeleted == null ? undefined : includeDeleted,
			});

			if (result.status === "success") {
				setAccountRolesListState((prev) => {
					return {
						...prev,
						count: count as number,
						page: page as number,
						search: search == null ? undefined : search,
						includeDeleted: includeDeleted == null ? undefined : includeDeleted,
						loading: false,
					};
				});

				setAccountRoless({
					accountRoles: result.accountRoles!.map((role) => ({
						_id: role._id.toString(),
						name: role.name ?? "",
						level: role.level ?? 0,
						totalPermissions: role.permissions.length,
						createdAt: role.metadata
							? new Date(role.metadata.createdAt ?? Date.now())
							: new Date(),
						deleted: role.metadata.deleted ?? false,
					})),
					totalAccountRoles: result.totalAccountRoles ?? 0,
				});
			} else {
				if (message && t) {
					message.error(t(`error-messages:${result.status}`));
				}
				setAccountRolesListState((prev) => ({ ...prev, loading: false }));
			}
		},
		[accountRolesListState, message, t],
	);

	return {
		accountRolesListState,
		accountRoles,
		fetchAccountRoles,
		//setAccountsListState, // expose if you want external control
	};
}
