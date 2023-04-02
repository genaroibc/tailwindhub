import { useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);

  return (
    <div className={styles.container}>
      <Editor
        onMount={(editor, monaco) => {
          codeEditorRef.current = editor;
          emmetHTML(monaco);
        }}
        className={styles.editor}
        theme="vs-dark"
        defaultLanguage="html"
        defaultValue={code}
        onChange={(code) => setCode(code ?? "")}
        line={2}
        loading={<Loader color="var(--primary-color, #fff)" />}
        options={{
          minimap: { enabled: false },
        }}
      />

      <div
        ref={codePreviewRef}
        className={styles.codePreview}
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>
    </div>
  );
}
