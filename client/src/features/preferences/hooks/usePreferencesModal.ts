import { useTranslation } from "react-i18next";
import { App } from "antd";
import { useState, useCallback } from "react";

import PreferencesFeature, { type IPreferences } from "../";

export type PreferencesModalState = IPreferences & {
  loading: boolean;
  isOpen: boolean;
};

export function usePreferencesModal({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation(["features"], {
    keyPrefix: "preferences.hooks.usePreferencesModal",
  });
  const { message } = App.useApp();

  const defaultState: PreferencesModalState = {
    loading: false,
    isOpen: false,
    name: "",
    location: "UNAH-Comayagua",
    theme: "dark",
  };

  const [state, setState] = useState<PreferencesModalState>(defaultState);

  const savePreferences = useCallback(async () => {
    if (state.loading) return;

    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    const result = await PreferencesFeature.storage.savePreferences(state);
    if (result) {
      message.success(t("messages.success"));
      setState(defaultState);

      if (onSuccess) onSuccess();
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
      message.success(t("messages.error"));
    }
  }, [state, message, t]);

  const openModal = useCallback(async () => {
    const currentPreferences =
      await PreferencesFeature.storage.getPreferences();
    setState((prev) => ({
      ...prev,
      ...currentPreferences,
      isOpen: true,
    }));
  }, []);

  return {
    state,
    setState,
    savePreferences,
    openModal,
  };
}
