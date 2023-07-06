import monaco from "monaco-editor";

export type CodeEditorRef =
  React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;

export type CodePreviewRef = React.RefObject<HTMLDivElement>;

export type Size = {
  width: number;
  height: number;
};

export type ConstrainSize = {
  width: number;
  height: number;
  zoom: number;
};

export type ResizingData = {
  direction: "bottom" | "left" | "right" | "bottom-left" | "bottom-right";
  startWidth: number;
  startHeight: number;
  startX: number;
  startY: number;
};

export type Breakpoint = {
  width: number;
  height: number;
};
