import { Form, Input, Select } from 'antd'

import { AccountAPITypes } from '../'
import type { FormInstance } from 'antd/lib'

type CreateAccountFormProps = {
  form: FormInstance<AccountAPITypes.CreateRequestBody>
  defaultValues: AccountAPITypes.CreateRequestBody
  t: (key: string) => string
  roles: { _id: string; name: string; level: number }[]
  onValuesChange?: (
    changedValues: any,
    allValues: AccountAPITypes.CreateRequestBody,
  ) => void
}

export function CreateAccountForm({
  form,
  defaultValues,
  t,
  roles,
  onValuesChange,
}: CreateAccountFormProps) {
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={defaultValues}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label={t('dashboard:accounts.modals.create.fields.name')}
        required
        name="name"
      >
        <Input
          maxLength={100}
          showCount
          placeholder={t(
            'dashboard:accounts.modals.create.fields.namePlaceholder',
          )}
        />
      </Form.Item>

      <Form.Item
        label={t('dashboard:accounts.modals.create.fields.email')}
        name="email"
        required
      >
        <Input
          placeholder={t(
            'dashboard:accounts.modals.create.fields.emailPlaceholder',
          )}
        />
      </Form.Item>

      <Form.Item
        label={t('dashboard:accounts.modals.create.fields.password')}
        name="password"
        required
      >
        <Input.Password
          maxLength={256}
          showCount
          placeholder={t(
            'dashboard:accounts.modals.create.fields.passwordPlaceholder',
          )}
        />
      </Form.Item>

      <Form.Item
        label={t('dashboard:accounts.modals.create.fields.role')}
        name="roleId"
        required
      >
        <Select
          placeholder={t('dashboard:accounts.modals.create.fields.selectRole')}
          options={roles.map((role) => ({
            value: role._id,
            label: `${role.name} (${role.level})`,
          }))}
        />
      </Form.Item>
    </Form>
  )
}
