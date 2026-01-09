import React from "react";
import { Modal, Button, Select, Input } from "antd";

import type { PreferencesModalState } from "../hooks/usePreferencesModal";

import { useTranslation } from "react-i18next";

interface PreferencesModalProps {
  state: PreferencesModalState;
  setState: React.Dispatch<React.SetStateAction<PreferencesModalState>>;
  savePreferences: () => Promise<void>;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({
  state,
  setState,
  savePreferences,
}) => {
  const { t } = useTranslation(["features"], {
    keyPrefix: "preferences.components.PreferencesModal",
  });

  return (
    <Modal
      open={state.isOpen}
      title={t("title")}
      onCancel={() => {}}
      footer={[
        <Button
          key="cancel"
          onClick={() => setState((prev) => ({ ...prev, isOpen: false }))}
        >
          {t("buttons.cancel")}
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={state.loading}
          onClick={savePreferences}
        >
          {t("buttons.save")}
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <label>{t("fields.name.label")}</label>
        <Input
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder={t("fields.name.placeholder")}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>{t("fields.location.label")}</label>
        <Select
          value={state.location}
          onChange={(value) =>
            setState((prev) => ({ ...prev, location: value }))
          }
          style={{ width: "100%" }}
        >
          <Select.Option value="UNAH-Comayagua">
            {t("fields.location.options.UNAH-Comayagua")}
          </Select.Option>
          <Select.Option value="UNAH-Tegucigalpa">
            {t("fields.location.options.UNAH-Tegucigalpa")}
          </Select.Option>
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>{t("fields.theme.label")}</label>
        <Select
          value={state.theme}
          onChange={(value) => setState((prev) => ({ ...prev, theme: value }))}
          style={{ width: "100%" }}
        >
          <Select.Option value="dark">
            {t("fields.theme.options.dark")}
          </Select.Option>

          <Select.Option value="light">
            {t("fields.theme.options.light")}
          </Select.Option>
        </Select>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
