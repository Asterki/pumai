import { Input, Form, Select } from 'antd'

import { AccountAPITypes } from '..'
import type { FormInstance } from 'antd/lib'

type UpdateAccountFormProps = {
  form: FormInstance<AccountAPITypes.UpdateRequestBody>
  defaultValues: AccountAPITypes.UpdateRequestBody
  t: (key: string) => string
  roles: { _id: string; name: string; level: number }[]
  onValuesChange?: (
    changedValues: any,
    allValues: AccountAPITypes.UpdateRequestBody,
  ) => void
}

export function UpdateAccountForm({
  form,
  defaultValues,
  t,
  roles,
  onValuesChange,
}: UpdateAccountFormProps) {
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={defaultValues}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label={t('dashboard:accounts.modals.update.fields.name')}
        required
        name="name"
      >
        <Input
          maxLength={100}
          showCount
          placeholder={t(
            'dashboard:accounts.modals.update.fields.namePlaceholder',
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('dashboard:accounts.modals.update.fields.email')}
        name="email"
        required
      >
        <Input
          placeholder={t(
            'dashboard:accounts.modals.update.fields.emailPlaceholder',
          )}
        />
      </Form.Item>

      <Form.Item
        label={t('dashboard:accounts.modals.update.fields.role')}
        name="roleId"
        required
      >
        <Select
          options={roles.map((role) => ({
            label: role.name,
            value: role._id,
          }))}
          placeholder={t(
            'dashboard:accounts.modals.update.fields.rolePlaceholder',
          )}
        />
      </Form.Item>
    </Form>
  )
}
