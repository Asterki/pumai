import api from "./api";
import * as schemas from "../../../../shared/schemas/account-roles";

import * as RAGDocumentsAPITypes from "../../../../shared/api/rag-documents";
import { IRAGDocument } from "../../../../shared/models/rag-document";

interface ListRAGDocument {
  _id: string;
  name: string;
  createdAt: Date;
  deleted: boolean;
}

// Hooks
import { useRagDocumentsList } from "./hooks/useRagDocumentsList";
// import { useCreateAccountRoleModal } from "./hooks/use";
// import { useDeleteAccountRoleModal } from "./hooks/useDeleteAccountRoleModal";
// import { useUpdateAccountRoleFormValidation } from "./hooks/useUpdateAccountRoleFormValidation";

// Components
import { RagDocumentsTable } from "./components/DocumentsTable";
// import { UpdateAccountRoleForm } from "./components/UpdateAccountRoleForm";
// import { CreateAccountRoleModal } from "./components/CreateAccountRoleModal";

export type { IRAGDocument, ListRAGDocument, RAGDocumentsAPITypes };
export default {
  api,
  schemas,
  hooks: {
    useRagDocumentsList,
    // useUpdateAccountRoleFormValidation,
    // useCreateAccountRoleModal,
    // useDeleteAccountRoleModal,
  },
  components: {
    RagDocumentsTable,
    // UpdateAccountRoleForm,
    // CreateAccountRoleModal,
  },
};
