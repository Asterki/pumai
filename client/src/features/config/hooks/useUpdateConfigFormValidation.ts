import { useCallback } from 'react'
import { Form } from 'antd'

import { useTranslation } from 'react-i18next'

import type { ConfigAPITypes } from '../'
import ConfigFeature from '../'

function flattenKeys(obj: Record<string, any>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value, path)
    }
    return [path]
  })
}

export function useUpdateConfigFormValidation() {
  const { t } = useTranslation(['main'])
  const [form] = Form.useForm<ConfigAPITypes.UpdateConfigRequestBody>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues: ConfigAPITypes.UpdateConfigRequestBody = {
    businessInfo: {
      address: '',
      email: '',
      phone: '',
      name: '',
      RTN: '',
    },
    currency: '',
    metadata: {},
    notifications: {
      email: {
        enabled: false,
        fromAddress: '',
        smtpHost: '',
        smtpPassword: '',
        smtpPort: 0,
        smtpUser: '',
      },
      sms: {
        enabled: false,
        apiKey: '',
        apiSecret: '',
        provider: '',
      },
      telegram: {
        enabled: false,
        botToken: '',
        chatId: '',
      },
    },
  }

  const setDefaultValues = useCallback(
    (values: ConfigAPITypes.UpdateConfigRequestBody) => {
      form.setFieldsValue(values)
    },
    [form],
  )

  const validate = useCallback(
    (values: ConfigAPITypes.UpdateConfigRequestBody) => {
      const result = ConfigFeature.schemas.updateConfigSchema.safeParse(values)

      // Flatten all possible field paths from default values
      const allFields = flattenKeys(defaultValues)

      if (result.success) {
        // No errors → clear all
        form.setFields(
          allFields.map((field) => ({
            name: field.split('.') as any,
            errors: [],
          })),
        )
        return true
      } else {
        // Map validation errors to AntD format
        const errors = result.error.issues.map((issue) => {
          const path = issue.path.join('.')
          return {
            name: path.split('.'), // AntD needs array of path segments
            errors: [
              t(
                `dashboard:config.messages.${
                  issue.code === 'invalid_union'
                    ? issue.errors[0][0].message
                    : issue.message
                }`,
              ),
            ],
          }
        })

        // Build a set of errored paths for quick lookup
        const erroredPaths = new Set(
          result.error.issues.map((issue) => issue.path.join('.')),
        )

        // Clear errors for fields that *didn’t* fail validation
        const clearedErrors = allFields
          .filter((field) => !erroredPaths.has(field))
          .map((field) => ({
            name: field.split('.'),
            errors: [],
          }))

        // Update form state
        // @ts-expect-error Trust me
        form.setFields([...errors, ...clearedErrors])

        return false
      }
    },
    [form, t, defaultValues],
  )

  const onValuesChange = useCallback(
    (_: any, allValues: ConfigAPITypes.UpdateConfigRequestBody) => {
      validate(allValues)
    },
    [validate],
  )

  return {
    form,
    validate,
    onValuesChange,
    defaultValues,
    setDefaultValues,
  }
}
