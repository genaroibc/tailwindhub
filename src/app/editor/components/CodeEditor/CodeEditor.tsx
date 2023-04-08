import { useState } from "react";
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
    <div className="grid-cols-1 overflow-hidden max-w-full w-full h-full grid md:grid-cols-2 gap-4 p-4 my-8 mx-auto">
      <Editor
        onMount={(editor, monaco) => {
          codeEditorRef.current = editor;
          emmetHTML(monaco);
        }}
        className="w-full"
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
        className="w-full max-h-screen overflow-scroll bg-white text-dimmed-black p-4"
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>
    </div>
  );
}
