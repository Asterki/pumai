import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

import { App, Button, Input, Modal, Drawer, Typography, Switch } from "antd";
const { Title, Text } = Typography;

import AdminPageLayout from "../../../layouts/Admin";
import { FaPlus, FaSave, FaTrash, FaUsersCog } from "react-icons/fa";

import AccountRolesFeature, {
  IAccountRole,
  RolesAPITypes,
} from "../../../features/roles";

export const Route = createFileRoute("/admin/accounts/roles")({
  component: RouteComponent,
});

function RouteComponent() {
  const { account } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t } = useTranslation(["main", "dashboard"]);

  const { accountRoles, fetchAccountRoles, accountRolesListState } =
    AccountRolesFeature.hooks.useAccountRolesList({ message, t });

  //#region Create Role
  const {
    form: createAccountRoleForm,
    validate: createAccountRoleValidation,
    defaultValues: createAccountRoleDefaultValues,
    onValuesChange: createAccountRoleOnvaluesChange,
  } = AccountRolesFeature.hooks.useCreateAccountRoleFormValidation(t);

  const [createAccountRoleModalState, setCreateAccountRoleModalState] =
    useState<{
      isOpen: boolean;
      loading: boolean;
    }>({
      isOpen: false,
      loading: false,
    });
  const resetCreateAccountModalState = () => {
    setCreateAccountRoleModalState({ isOpen: false, loading: false });
    createAccountRoleForm.resetFields();
  };

  const handleCreateAccountRole = async () => {
    if (createAccountRoleModalState.loading) return;

    // Use hook’s validate method — sets form errors internally
    const values = createAccountRoleForm.getFieldsValue(true);
    if (!createAccountRoleValidation(values)) {
      return;
    }

    setCreateAccountRoleModalState((prev) => ({ ...prev, loading: true }));
    const result = await AccountRolesFeature.api.create(values);

    if (result.status === "success") {
      message.success(t("dashboard:roles.modals.create.messages.success"));

      createAccountRoleForm.resetFields();
      setCreateAccountRoleModalState({ isOpen: false, loading: false });

      await fetchAccountRoles({});
    } else if (result.status === "level-in-use") {
      setCreateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t("dashboard:roles.modals.create.messages.level-in-use"));
    } else if (result.status === "level-too-high") {
      setCreateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t("dashboard:roles.modals.create.messages.level-too-high"));
    } else {
      setCreateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t(`error-messages:${result.status}`));
    }
  };
  //#endregion

  //#region Delete Role
  type DeleteAccountRoleModalState = RolesAPITypes.DeleteRequestBody & {
    isOpen: boolean;
    loading: boolean;
  };
  const defaultDeleteAccountRoleModalState: DeleteAccountRoleModalState = {
    loading: false,
    isOpen: false,
    roleId: "",
  };

  const resetDeleteAccountRoleModalState = () =>
    setDeleteAccountRoleModalState(defaultDeleteAccountRoleModalState);

  const [deleteAccountRoleModalState, setDeleteAccountRoleModalState] =
    useState<DeleteAccountRoleModalState>(defaultDeleteAccountRoleModalState);
  const deleteRole = async () => {
    if (deleteAccountRoleModalState.roleId == null) return;

    setDeleteAccountRoleModalState((prev) => ({ ...prev, loading: true }));
    const result = await AccountRolesFeature.api.delete({
      roleId: deleteAccountRoleModalState.roleId,
    });

    if (result.status == "success") {
      message.success(t("dashboard:roles.modals.delete.messages.success"));
      setDeleteAccountRoleModalState(defaultDeleteAccountRoleModalState);

      await fetchAccountRoles({ count: 50, page: 0 });
    } else {
      setDeleteAccountRoleModalState((prev) => ({ ...prev, loading: true }));
      message.error(t(`error-messages:${result.status}`));
    }
  };
  //#endregion

  //#region Restore a role
  const handleRestoreAccountRole = async (accId: string) => {
    if (!accId) return;
    const result = await AccountRolesFeature.api.restore({
      roleId: accId,
    });

    if (result.status == "success") {
      message.success(t("dashboard:roles.modals.restore.messages.success"));
      fetchAccountRoles({ count: 50, page: 0 });
    } else {
      message.error(t(`error-messages:${result.status}`));
    }
  };
  //#endregion

  // #region Update a role
  const {
    form: updateAccountRoleForm,
    validate: updateAccountRoleValidation,
    defaultValues: updateAccountRoleDefaultValues,
    onValuesChange: updateAccountRoleOnvaluesChange,
  } = AccountRolesFeature.hooks.useUpdateAccountRoleFormValidation(t);

  const loadUpdateAccountRole = async (roleId: string) => {
    if (!roleId) return;
    const result = await AccountRolesFeature.api.get({
      roleIds: [roleId],
    });
    if (result.status === "success") {
      const role = result.accountRoles![0];
      if (role) {
        updateAccountRoleForm.setFieldsValue({
          permissions: role.permissions,
          roleId: role._id.toString(),
          description: role.description,
          level: role.level,
          name: role.name,
          requiresTwoFactor: role.requiresTwoFactor,
        });
      }
    } else {
      message.error(t(`error-messages:${result.status}`));
    }
  };

  const [updateAccountRoleModalState, setUpdateAccountRoleModalState] =
    useState<{
      isOpen: boolean;
      loading: boolean;
    }>({
      isOpen: false,
      loading: false,
    });
  const resetUpdateAccountModalState = () => {
    setUpdateAccountRoleModalState({ isOpen: false, loading: false });
    updateAccountRoleForm.resetFields();
  };

  const handleAccountRoleUpdate = async () => {
    if (updateAccountRoleModalState.loading) return;

    // Use hook’s validate method — sets form errors internally
    const values = updateAccountRoleForm.getFieldsValue(true);
    if (!updateAccountRoleValidation(values)) {
      return;
    }

    setUpdateAccountRoleModalState((prev) => ({ ...prev, loading: true }));
    const result = await AccountRolesFeature.api.update(values);

    if (result.status === "success") {
      message.success(t("dashboard:roles.modals.update.messages.success"));

      updateAccountRoleForm.resetFields();
      setUpdateAccountRoleModalState({ isOpen: false, loading: false });

      await fetchAccountRoles({});
    } else if (result.status === "level-in-use") {
      setCreateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t("dashboard:roles.modals.create.messages.level-in-use"));
    } else if (result.status === "level-too-high") {
      setCreateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t("dashboard:roles.modals.create.messages.level-too-high"));
    } else {
      setUpdateAccountRoleModalState((prev) => ({ ...prev, loading: false }));
      message.error(t(`error-messages:${result.status}`));
    }
  };
  //#endregion

  useEffect(() => {
    if (!account) return; // Admin layout will handle this
    if (
      !account.data.role.permissions.includes("account-roles:read") &&
      !account.data.role.permissions.includes("*")
    ) {
      message.error(t("error-messages:forbidden"));
      navigate({ to: "/dashboard" });
      return;
    } else {
      (async () => {
        await fetchAccountRoles({ count: 50, page: 0 });
      })();
    }
  }, [account]);

  return (
    <AdminPageLayout selectedPage="roles">
      {/* Create Role */}
      <Modal
        title={t("dashboard:roles.modals.create.title")}
        open={createAccountRoleModalState.isOpen}
        onOk={handleCreateAccountRole}
        okText={t("dashboard:common.create")}
        okButtonProps={{
          variant: "solid",
          loading: createAccountRoleModalState.loading,
          disabled: createAccountRoleModalState.loading,
          icon: <FaPlus />,
        }}
        cancelText={t("dashboard:common.cancel")}
        onCancel={resetCreateAccountModalState}
      >
        <AccountRolesFeature.components.CreateAccountRoleForm
          defaultValues={createAccountRoleDefaultValues}
          form={createAccountRoleForm}
          onValuesChange={createAccountRoleOnvaluesChange}
          t={t}
        />
      </Modal>

      {/* Update Role */}
      <Drawer
        title={t("dashboard:roles.modals.update.title")}
        open={updateAccountRoleModalState.isOpen}
        onClose={resetUpdateAccountModalState}
        width={1000}
        extra={
          <Button
            icon={<FaSave />}
            type="primary"
            loading={updateAccountRoleModalState.loading}
            onClick={handleAccountRoleUpdate}
          >
            {t("dashboard:common.save")}
          </Button>
        }
      >
        <AccountRolesFeature.components.UpdateAccountRoleForm
          form={updateAccountRoleForm}
          defaultValues={updateAccountRoleDefaultValues}
          onValuesChange={updateAccountRoleOnvaluesChange}
        />
      </Drawer>

      {/* Delete Role */}
      <Modal
        title={t("dashboard:roles.modals.delete.title")}
        open={deleteAccountRoleModalState.isOpen}
        onOk={deleteRole}
        okButtonProps={{
          icon: <FaTrash />,
          loading: deleteAccountRoleModalState.loading,
          danger: true,
        }}
        okText={t("dashboard:common.delete")}
        cancelText={t("dashboard:common.cancel")}
        onCancel={resetDeleteAccountRoleModalState}
      >
        <p>{t("dashboard:roles.modals.delete.description")}</p>
      </Modal>

      <div className="mb-2">
        {t("dashboard:common.loggedInAs", {
          name: account?.profile.name,
          email: account?.email.value,
        })}
      </div>

      <Title className="flex items-center gap-2">
        <FaUsersCog />
        {t("dashboard:roles.page.title")}
      </Title>

      <Text>{t("dashboard:roles.page.description")}</Text>

      <div className="my-2 flex items-center gap-2">
        <Button
          variant="solid"
          type="primary"
          disabled={
            !account ||
            !(
              account?.data.role.permissions.includes("*") ||
              account?.data.role.permissions.includes("account-roles:create")
            )
          }
          onClick={() => {
            setCreateAccountRoleModalState({
              ...createAccountRoleModalState,
              isOpen: true,
            });
          }}
          icon={<FaPlus />}
        >
          {t("dashboard:roles.page.createRole")}
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2 items-center">
        <Input.Search
          type="text"
          variant="outlined"
          allowClear
          onSearch={(query) => {
            if (!query || query.trim() === "") return;
            fetchAccountRoles({
              search: {
                query: query.trim(),
                searchIn: ["name"],
              },
              count: 50,
              page: 0,
            });
          }}
          loading={accountRolesListState.loading}
          enterButton={t("dashboard:common.search")}
          placeholder={t("dashboard:roles.page.searchPlaceholder")}
        />
      </div>

      {/* Roles List */}
      {account && (
        <AccountRolesFeature.components.AccountRolesTable
          fetchAccountRoles={fetchAccountRoles}
          accountRoles={accountRoles}
          t={t}
          accountRolesListState={accountRolesListState}
          accountPermissions={(account.data.role as IAccountRole).permissions}
          onRestore={(accRole) => {
            handleRestoreAccountRole(accRole._id);
          }}
          onUpdate={async (acc) => {
            if (acc.level === -1) {
              return message.warning(
                "No puedes editar el rol de administrador.",
              );
            }
            setUpdateAccountRoleModalState({
              isOpen: true,
              loading: false,
            });
            await loadUpdateAccountRole(acc._id);
          }}
          onDelete={(accRole) => {
            setDeleteAccountRoleModalState({
              isOpen: true,
              loading: false,
              roleId: accRole._id,
            });
          }}
        />
      )}

      <div className="flex mt-4 gap-2 items-center">
        <Switch
          id="page-show-deleted"
          checked={accountRolesListState.includeDeleted}
          onChange={(value) => {
            fetchAccountRoles({
              includeDeleted: value,
            });
          }}
        />

        <label htmlFor="page-show-deleted">
          {t("dashboard:roles.page.showDeleted")}
        </label>
      </div>
    </AdminPageLayout>
  );
}
