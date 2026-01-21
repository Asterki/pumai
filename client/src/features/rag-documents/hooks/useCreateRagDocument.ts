import { useCallback, useState } from "react";
import { App } from "antd";
import { useTranslation } from "react-i18next";

import RagDocumentsFeature, { RAGDocumentsAPITypes } from "../";

export type CreateRagDocumentModalState =
  RAGDocumentsAPITypes.CreateRequestBody & {
    isOpen: boolean;
    loading: boolean;
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
    type: "text",
    content: "",
    authorityLevel: 1,
    campuses: ["GLOBAL"],
    category: "student_life",
    description: "",
    effectiveFrom: new Date().toISOString(),
    name: "",
    effectiveUntil: undefined,
    tags: [],
  };

  const [state, setState] = useState<CreateRagDocumentModalState>(defaultState);

  const createDocument = useCallback(async () => {
    if (state.loading) return;

    const parsedData = RagDocumentsFeature.schemas.createSchema.safeParse(state);
    if (!parsedData.success) {
      parsedData.error.issues.forEach((issue) => {
        message.warning(t(`messages:${issue.message}`));
      });
      return; // stop if validation fails
    }

    setState((prev) => ({ ...prev, loading: true }));
    const result = await RagDocumentsFeature.api.create(parsedData.data);

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
