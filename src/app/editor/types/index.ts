import monaco from "monaco-editor";

export type CodeEditorRef =
  React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;

export type CodePreviewRef = React.RefObject<HTMLDivElement>;
