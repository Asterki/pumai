import { useState, useCallback } from "react";

import RAGDocumentsFeature, {
  RAGDocumentsAPITypes,
  ListRAGDocument,
} from "../";
import { useTranslation } from "react-i18next";
import { App } from "antd";

type NullableRAGDocumentsListState = {
  [K in keyof RAGDocumentsAPITypes.ListRequestBody]?:
    | RAGDocumentsAPITypes.ListRequestBody[K]
    | null;
};

type UseRagDocumentsListOptions = {
  apiList?: typeof RAGDocumentsFeature.api.list;
};

export function useRagDocumentsList({
  apiList = RAGDocumentsFeature.api.list,
}: UseRagDocumentsListOptions) {
  const { message } = App.useApp();
  const { t: tErrorMessages } = useTranslation(["error-messages"]);

  const [ragDocumentsListState, setRagDocumentsListState] = useState<
    RAGDocumentsAPITypes.ListRequestBody & { loading: boolean }
  >({
    loading: true,
    fields: [
      "_id",
      "title",
      "category",
      "authorityLevel",
      "sourceType",
      "campuses",
      "deliveryModes",
      "effectiveFrom",
      "effectiveUntil",
      "archived",
      "warnings",
      "summary",
      "tags",
      "metadata",
    ],
    count: 50,
    page: 0,
  });

  const [ragDocuments, setRagDocuments] = useState<{
    totalRagDocuments: number;
    ragDocuments: ListRAGDocument[];
  }>({
    ragDocuments: [],
    totalRagDocuments: 0,
  });

  const fetchRagDocuments = useCallback(
    async ({
      count = ragDocumentsListState.count,
      page = ragDocumentsListState.page,
      includeDeleted = ragDocumentsListState.includeDeleted,
      search = ragDocumentsListState.search,
    }: NullableRAGDocumentsListState = {}) => {
      setRagDocumentsListState((prev) => ({ ...prev, loading: true }));

      const result = await apiList({
        ...ragDocumentsListState,
        search: search == null ? undefined : search,
        includeDeleted: includeDeleted == null ? undefined : includeDeleted,
      });

      if (result.status === "success") {
        setRagDocumentsListState((prev) => ({
          ...prev,
          count: count as number,
          page: page as number,
          search: search == null ? undefined : search,
          includeDeleted: includeDeleted == null ? undefined : includeDeleted,
          loading: false,
        }));

        setRagDocuments({
          ragDocuments: result.ragDocuments!.map((doc) => ({
            ...doc,
            effective: {
              from: doc.effectiveFrom,
              until: doc.effectiveUntil,
            },
            _id: doc._id.toString(),
            createdAt: doc.metadata
              ? new Date(doc.metadata.createdAt ?? Date.now())
              : new Date(),
            deleted: doc.metadata.deleted ?? false,
          })),
          totalRagDocuments: result.totalRagDocuments ?? 0,
        });
      } else {
        if (message) {
          message.error(tErrorMessages(`${result.status}`));
        }
        setRagDocumentsListState((prev) => ({ ...prev, loading: false }));
      }
    },
    [ragDocumentsListState, message, tErrorMessages],
  );

  return {
    ragDocumentsListState,
    ragDocuments,
    fetchRagDocuments,
    // setRagDocumentsListState, // expose if you want external control
  };
}
