import { useCallback } from "react";
import { Form } from "antd";
import { TFunction } from "i18next";

import { RolesAPITypes } from "../";
import AccountRolesFeature from "../";

export function useCreateAccountRoleFormValidation(t: TFunction) {
	const [form] = Form.useForm<RolesAPITypes.CreateRequestBody>();

	const defaultValues: RolesAPITypes.CreateRequestBody = {
		level: 1,
		name: "",
		description: "",
	};

	const validate = useCallback(
		(values: RolesAPITypes.CreateRequestBody) => {
			const result =
				AccountRolesFeature.schemas.createAccountRoleSchema.safeParse(values);

			if (result.success) {
				// No errors at all, clear all errors
				form.setFields(
					Object.keys(defaultValues).map((field) => ({
						name: field as keyof RolesAPITypes.CreateRequestBody,
						errors: [],
					})),
				);
				return true;
			} else {
				const erroredFields = new Set(
					result.error.issues.map(
						(issue) => issue.path[0] as keyof RolesAPITypes.CreateRequestBody,
					),
				);

				// Prepare errors array for fields that have errors
				const errors = result.error.issues.map((issue) => ({
					name: issue.path as [keyof RolesAPITypes.CreateRequestBody],
					errors: [
						t(`dashboard:roles.modals.create.messages.${issue.message}`),
					],
				}));

				// For fields without errors, clear them explicitly
				const clearedErrors = Object.keys(defaultValues)
					.filter(
						(field) =>
							!erroredFields.has(
								field as keyof RolesAPITypes.CreateRequestBody,
							),
					)
					.map((field) => ({
						name: field as keyof RolesAPITypes.CreateRequestBody,
						errors: [],
					}));

				form.setFields([...errors, ...clearedErrors]);

				return false;
			}
		},
		[form, t, defaultValues],
	);

	const onValuesChange = useCallback(
		(_: any, allValues: RolesAPITypes.CreateRequestBody) => {
			validate(allValues);
		},
		[validate],
	);

	return {
		form,
		validate,
		onValuesChange,
		defaultValues,
	};
}
