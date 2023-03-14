"use client";

import { useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: ({ code }: { code: string }) => void;
};

export function CodeEditor({ onSubmit }: Props) {
  const [code, setCode] = useState(
    "<h1 class='text-center font-extrabold text-4xl text-blue-400'>Hello world</h1>"
  );

  // const editorRef = useRef(null);

  // const handleEditorDidMount = (editor: any) => {
  //   editorRef.current = editor;
  // };

  return (
    <div className={styles.editorContainer}>
      <div dangerouslySetInnerHTML={{ __html: code }}></div>
      <Editor
        theme="vs-dark"
        height="90vh"
        defaultLanguage="html"
        defaultValue={code}
        // onMount={handleEditorDidMount}
        onChange={(code) => setCode(code ?? "")}
        line={2}
      />

      <button onClick={() => onSubmit({ code })}>Create component</button>
    </div>
  );
}
