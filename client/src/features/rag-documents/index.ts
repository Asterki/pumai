import api from "./api";
import * as schemas from "../../../../shared/schemas/account-roles";

import * as RAGDocumentsAPITypes from "../../../../shared/api/rag-documents";
import { IRAGDocument } from "../../../../shared/models/rag-document";
import { CampusCode, DocumentCategory } from "../../../../shared/models";

interface ListRAGDocument {
  _id: string;
  name: string;
  category: DocumentCategory;
  authorityLevel: number;
  campuses: CampusCode[];
  effective: {
    from: Date;
    until: Date | null;
  };
  tags: string[];
  createdAt: Date;
  deleted: boolean;
}

// Hooks
import { useRagDocumentsList } from "./hooks/useRagDocumentsList";
import { useCreateRagDocumentModal } from "./hooks/useCreateRagDocument";
// import { useDeleteAccountRoleModal } from "./hooks/useDeleteAccountRoleModal";
// import { useUpdateAccountRoleFormValidation } from "./hooks/useUpdateAccountRoleFormValidation";

// Components
import { RagDocumentsTable } from "./components/DocumentsTable";
import { CreateRagDocumentModal } from "./components/CreateRAGDocumentModal";
// import { CreateAccountRoleModal } from "./components/CreateAccountRoleModal";

export type { IRAGDocument, ListRAGDocument, RAGDocumentsAPITypes };
export default {
  api,
  schemas,
  hooks: {
    useRagDocumentsList,
    useCreateRagDocumentModal,
    // useCreateAccountRoleModal,
    // useDeleteAccountRoleModal,
  },
  components: {
    RagDocumentsTable,
    CreateRagDocumentModal,
    // CreateAccountRoleModal,
  },
};
