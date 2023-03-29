import { useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import Script from "next/script";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(
    "<h1 class='text-center font-extrabold text-4xl text-blue-400'>Hello world</h1>"
  );

  return (
    <div className={styles.editorContainer}>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script strategy="beforeInteractive" src="tailwind-3.2.6.min.js" />
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
