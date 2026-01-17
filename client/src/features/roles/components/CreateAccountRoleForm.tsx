import { Form, Input, InputNumber } from "antd";

import { RolesAPITypes } from "../";
import { FormInstance } from "antd/lib";

type CreateAccountRoleFormProps = {
	form: FormInstance<RolesAPITypes.CreateRequestBody>;
	defaultValues: RolesAPITypes.CreateRequestBody;
	t: (key: string) => string;
	onValuesChange?: (
		changedValues: any,
		allValues: RolesAPITypes.CreateRequestBody,
	) => void;
};

export function CreateAccountRoleForm({
	form,
	defaultValues,
	t,
	onValuesChange,
}: CreateAccountRoleFormProps) {
	return (
		<Form
			layout="vertical"
			form={form}
			initialValues={defaultValues}
			onValuesChange={onValuesChange}
		>
			<Form.Item
				label={t("dashboard:roles.modals.create.fields.name")}
				required
				name="name"
			>
				<Input
					placeholder={t(
						"dashboard:roles.modals.create.fields.namePlaceholder",
					)}
					max={100}
					count={{
						max: 100,
						show: true,
					}}
				/>
			</Form.Item>

			<Form.Item
				label={t("dashboard:roles.modals.create.fields.description")}
				name="description"
			>
				<Input
					max={500}
					count={{
						max: 500,
						show: true,
					}}
					placeholder={t(
						"dashboard:roles.modals.create.fields.descriptionPlaceholder",
					)}
				/>
			</Form.Item>

			<Form.Item
				label={t("dashboard:roles.modals.create.fields.level")}
				name="level"
				required
			>
				<InputNumber
					className="w-full"
					min={0}
					max={1000} // Arbitrary upper bound for sanity
					precision={0}
					type="number"
					variant="outlined"
					placeholder={t(
						"dashboard:roles.modals.create.fields.levelPlaceholder",
					)}
				/>
			</Form.Item>
		</Form>
	);
}
