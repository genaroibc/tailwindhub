import { useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE } from "@/constants";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);

  return (
    <div className={styles.editorContainer}>
      <Editor
        onMount={(editor) => (codeEditorRef.current = editor)}
        className={styles.editor}
        theme="vs-dark"
        defaultLanguage="html"
        defaultValue={code}
        onChange={(code) => setCode(code ?? "")}
        line={2}
      />
      <div className={styles.previewContainer}>
        <div
          ref={codePreviewRef}
          className={styles.previewContainer__codePreview}
          dangerouslySetInnerHTML={{ __html: code }}
        ></div>
      </div>
    </div>
  );
}
