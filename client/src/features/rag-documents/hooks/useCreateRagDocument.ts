import { useCallback, useState } from "react";
import { App } from "antd";
import { useTranslation } from "react-i18next";

import RagDocumentsFeature from "../";

export type CreateRagDocumentModalState = {
  isOpen: boolean;
  loading: boolean;

  file?: File;

  name: string;
  category?: string;
  authorityLevel?: number;

  campuses: string[];

  effectiveFrom?: Date;
  effectiveUntil?: Date | null;

  tags: string[];
};

export function useCreateRagDocumentModal({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { t } = useTranslation(["features"], {
    keyPrefix: "rag-documents.hooks.useCreateModal",
  });
  const { t: tErrorMessages } = useTranslation(["error-messages"]);
  const { message } = App.useApp();

  const defaultState: CreateRagDocumentModalState = {
    isOpen: false,
    loading: false,
    name: "",
    campuses: [],
    tags: [],
  };

  const [state, setState] = useState<CreateRagDocumentModalState>(defaultState);

  const createDocument = useCallback(async () => {
    if (state.loading) return;

    // Minimal client-side validation
    if (!state.file) {
      message.warning(t("messages.fileRequired"));
      return;
    }
    if (!state.name) {
      message.warning(t("messages.nameRequired"));
      return;
    }
    if (!state.category) {
      message.warning(t("messages.categoryRequired"));
      return;
    }
    if (state.authorityLevel === undefined) {
      message.warning(t("messages.authorityLevelRequired"));
      return;
    }
    if (!state.campuses.length) {
      message.warning(t("messages.campusesRequired"));
      return;
    }
    if (!state.effectiveFrom) {
      message.warning(t("messages.effectiveFromRequired"));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append("file", state.file);
    formData.append("name", state.name);
    formData.append("category", state.category);
    formData.append("authorityLevel", String(state.authorityLevel));
    formData.append("campuses", JSON.stringify(state.campuses));
    formData.append("effectiveFrom", state.effectiveFrom.toISOString());
    if (state.effectiveUntil) {
      formData.append("effectiveUntil", state.effectiveUntil.toISOString());
    }
    formData.append("tags", JSON.stringify(state.tags));

    const result = await RagDocumentsFeature.api.create(formData);

    if (result.status === "success") {
      message.success(t("messages.success"));
      setState(defaultState);
      onSuccess?.();
    } else {
      setState((prev) => ({ ...prev, loading: false }));
      message.error(tErrorMessages(result.status));
    }
  }, [state, message, t, tErrorMessages, onSuccess]);

  const openModal = useCallback(
    () => setState((prev) => ({ ...prev, isOpen: true })),
    [],
  );

  const closeModal = useCallback(() => setState(defaultState), []);

  return {
    state,
    setState,
    createDocument,
    openModal,
    closeModal,
  };
}
