import api from "./api";
import * as schemas from "../../../../shared/zod-schemas/account-roles";

import * as RolesAPITypes from "../../../../shared/types/api/account-roles";
import { IAccountRole } from "../../../../shared/models/account-role";

// Hooks
import { useAccountRolesList } from "./hooks/useAccountRolesList";
import { useCreateAccountRoleFormValidation } from "./hooks/useCreateAccountRoleFormValidation";
import { useUpdateAccountRoleFormValidation } from "./hooks/useUpdateAccountRoleFormValidation";

// Components
import { AccountRolesTable } from "./components/AccountRolesTable";
import { CreateAccountRoleForm } from "./components/CreateAccountRoleForm";
import { UpdateAccountRoleForm } from "./components/UpdateAccountRoleForm";

export type { IAccountRole, RolesAPITypes };
export default {
	api,
	schemas,
	hooks: {
		useAccountRolesList,
		useCreateAccountRoleFormValidation,
    useUpdateAccountRoleFormValidation,
	},
	components: {
		AccountRolesTable,
		CreateAccountRoleForm,
		UpdateAccountRoleForm,
	},
};
