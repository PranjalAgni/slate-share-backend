export const ON_CONNECTION = "connection";
export const EDITOR_OPERATIONS = "editor-operations";
export const REMOTE_EDITOR_OPERATIONS = "remote-editor-operations";
export const INIT_TEXT = "init_text";
export const INIT_TEXT_REQUEST = "init_text_request";

export interface IEditorData {
  editorId: string;
  operations: string;
  editorText: Record<string, unknown>;
}
