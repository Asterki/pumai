import { Input, Tour, Form, Collapse, Typography, Select } from 'antd'

import { useTranslation } from 'react-i18next'

import cc from 'currency-codes'
import timezonesArray from '../../../../../shared/constants/timezones'

const { Text } = Typography

import type { ConfigAPITypes } from '..'
import ConfigFeature from '..'
import type { FormInstance } from 'antd/lib'

type UpdateAccountFormProps = {
  form: FormInstance<ConfigAPITypes.UpdateConfigRequestBody>
  defaultValues: ConfigAPITypes.UpdateConfigRequestBody
  onValuesChange?: (
    changedValues: any,
    allValues: ConfigAPITypes.UpdateConfigRequestBody,
  ) => void
}

export function UpdateConfigForm({
  form,
  defaultValues,
  onValuesChange,
}: UpdateAccountFormProps) {
  const { t } = useTranslation(['main'])
  const { refs, steps } = ConfigFeature.hooks.useTutorial()

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={defaultValues}
      onValuesChange={onValuesChange}
    >
      <Collapse
        className="mt-4"
        defaultActiveKey={[
          'businessInfo',
          'currency',
          'taxes',
          'paymentMethods',
          'notifications',
        ]}
        items={[
          {
            key: 'businessInfo',
            label: t('dashboard:config.businessInfo.header'),
            children: (
              <div ref={refs.step2}>
                <Text type="warning" strong>
                  {t('dashboard:config.businessInfo.note')}
                </Text>

                <Form.Item
                  name={['businessInfo', 'name']}
                  required
                  className="mt-4"
                  label={t('dashboard:config.businessInfo.name')}
                >
                  <Input
                    maxLength={300}
                    showCount={true}
                    ref={refs.step3}
                    placeholder={t(
                      'dashboard:config.businessInfo.namePlaceholder',
                    )}
                  />
                </Form.Item>

                <Form.Item
                  name={['businessInfo', 'address']}
                  required
                  label={t('dashboard:config.businessInfo.address')}
                >
                  <Input
                    maxLength={500}
                    ref={refs.step4}
                    showCount={true}
                    placeholder={t(
                      'dashboard:config.businessInfo.addressPlaceholder',
                    )}
                  />
                </Form.Item>

                <Form.Item
                  name={['businessInfo', 'phone']}
                  required
                  label={t('dashboard:config.businessInfo.phone')}
                >
                  <Input
                    maxLength={20}
                    ref={refs.step5}
                    showCount={true}
                    placeholder={t(
                      'dashboard:config.businessInfo.phonePlaceholder',
                    )}
                  />
                </Form.Item>

                <Form.Item
                  name={['businessInfo', 'email']}
                  required
                  label={t('dashboard:config.businessInfo.email')}
                >
                  <Input
                    ref={refs.step6}
                    placeholder={t(
                      'dashboard:config.businessInfo.emailPlaceholder',
                    )}
                  />
                </Form.Item>

                <Form.Item
                  name={['businessInfo', 'RTN']}
                  required
                  label={t('dashboard:config.businessInfo.rtn')}
                >
                  <Input
                    maxLength={14}
                    showCount={true}
                    placeholder={t(
                      'dashboard:config.businessInfo.rtnPlaceholder',
                    )}
                  />
                </Form.Item>
              </div>
            ),
          },

          {
            key: 'currency',
            label: t('dashboard:config.system.header'),
            children: (
              <div>
                <Text type="warning" strong>
                  {t('dashboard:config.system.note')}
                </Text>

                <Form.Item
                  name={'currency'}
                  required
                  className="mt-4"
                  label={t('dashboard:config.system.currency')}
                >
                  <Select
                    placeholder={t(
                      'dashboard:config.system.currencyPlaceholder',
                    )}
                    showSearch
                    options={cc.data.map((code) => ({
                      value: code.code,
                      label: `${code.code} (${code.countries[0]})`,
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  name={'timezone'}
                  required
                  label={t('dashboard:config.system.timezone')}
                >
                  <Select
                    placeholder={t(
                      'dashboard:config.system.timezonePlaceholder',
                    )}
                    showSearch
                    options={timezonesArray.map((tz) => ({
                      value: tz,
                      label: tz,
                    }))}
                  />
                </Form.Item>
              </div>
            ),
          },
        ]}
      />

      <Tour open={true} onClose={() => {}} steps={steps} />
    </Form>
  )
}
