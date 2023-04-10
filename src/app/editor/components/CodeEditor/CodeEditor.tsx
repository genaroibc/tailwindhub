import { useState } from "react";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { EditorLayout } from "../EditorLayout";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);

  return (
    <EditorLayout
      preview={
        <div
          ref={codePreviewRef}
          className="w-full h-full overflow-auto bg-white text-dimmed-black"
          dangerouslySetInnerHTML={{ __html: code }}
        ></div>
      }
      editor={
        <Editor
          onMount={(editor, monaco) => {
            codeEditorRef.current = editor;
            emmetHTML(monaco);
          }}
          className="w-full h-full"
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
      }
    />
  );
}
