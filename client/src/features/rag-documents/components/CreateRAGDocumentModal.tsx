import {
  Form,
  Input,
  InputNumber,
  Modal,
  Upload,
  Select,
  DatePicker,
} from "antd";
import { FaUpload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const { Dragger } = Upload;

import type { CreateRagDocumentModalState } from "../hooks/useCreateRagDocument";

export function CreateRagDocumentModal({
  state,
  setState,
  onClose,
  onCreate,
}: {
  state: CreateRagDocumentModalState;
  setState: React.Dispatch<React.SetStateAction<CreateRagDocumentModalState>>;
  onClose: () => void;
  onCreate: () => void;
}) {
  const { t } = useTranslation(["features"], {
    keyPrefix: "rag-documents.components.createModal",
  });
  const { t: tCommon } = useTranslation(["common"]);

  return (
    <Modal
      title={t("title")}
      open={state.isOpen}
      onCancel={onClose}
      onOk={onCreate}
      cancelText={tCommon("cancel")}
      okText={t("title")}
      okButtonProps={{
        loading: state.loading,
        icon: <FaUpload />,
        disabled: state.loading || !state.content,
      }}
    >
      <Form layout="vertical">
        <Form.Item label={t("fields.select")} required>
          <Select
            placeholder={t("fields.selectPlaceholder")}
            options={[{ label: t("fields.text"), value: "text" }]}
            onChange={(value) =>
              setState((prev: any) => ({ ...prev, type: value }))
            }
            value={state.type}
          />
        </Form.Item>

        {state.type === "file" && (
          <Form.Item label={t("fields.file")} required>
            <Dragger
              beforeUpload={(file) => {
                setState((prev: any) => ({ ...prev, file }));
                return false;
              }}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <FaUpload />
              </p>
              <p className="ant-upload-text">{t("fields.fileHint")}</p>
            </Dragger>
          </Form.Item>
        )}

        {state.type === "text" && (
          <Form.Item label={t("fields.content")} required>
            <Input.TextArea
              rows={6}
              maxLength={5000}
              placeholder={t("fields.contentPlaceholder")}
              onChange={(e) =>
                setState((prev: any) => ({ ...prev, content: e.target.value }))
              }
            />
          </Form.Item>
        )}

        <Form.Item label={t("fields.name")} required>
          <Input
            maxLength={150}
            placeholder={t("fields.namePlaceholder")}
            onChange={(e) =>
              setState((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.description")} required>
          <Input
            maxLength={150}
            placeholder={t("fields.descriptionPlaceholder")}
            onChange={(e) =>
              setState((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.category")} required>
          <Select
            options={[
              { value: "regulation", label: "Regulación" },
              { value: "administrative", label: "Administrativo" },
              { value: "campus_service", label: "Servicios del campus" },
              { value: "student_life", label: "Vida estudiantil" },
              { value: "support", label: "Soporte" },
            ]}
            onChange={(value) =>
              setState((prev: any) => ({ ...prev, category: value }))
            }
          />
        </Form.Item>

        <Form.Item
          label={t("fields.authorityLevel")}
          tooltip={t("fields.authorityLevelHint")}
          required
        >
          <InputNumber
            min={0}
            max={1000}
            precision={0}
            className="w-full"
            style={{ width: "100%" }}
            onChange={(value) =>
              setState((prev: any) => ({
                ...prev,
                authorityLevel: value,
              }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.campuses")} required>
          <Select
            mode="multiple"
            placeholder="GLOBAL o campus específicos"
            onChange={(value) =>
              setState((prev: any) => ({ ...prev, campuses: value }))
            }
            options={[{ label: "GLOBAL", value: "global" }]}
          />
        </Form.Item>

        <Form.Item label={t("fields.effectiveFrom")} required>
          <DatePicker
            className="w-full"
            onChange={(date) =>
              setState((prev: any) => ({
                ...prev,
                effectiveFrom: date?.toISOString(),
              }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.effectiveUntil")}>
          <DatePicker
            className="w-full"
            onChange={(date) =>
              setState((prev: any) => ({
                ...prev,
                effectiveUntil: date ? date.toISOString() : null,
              }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.tags")}>
          <Select
            mode="tags"
            placeholder={t("fields.tagsPlaceholder")}
            onChange={(value) =>
              setState((prev: any) => ({ ...prev, tags: value }))
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
