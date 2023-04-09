import { useState } from "react";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { ResizableSection } from "../ResizableSection";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);

  return (
    <ResizableSection className="overflow-hidden w-full h-full grid-cols-1 grid-rows-2 md:grid-rows-1 grid md:grid-cols-2">
      <ResizableSection.LeftSide>
        <Editor
          onMount={(editor, monaco) => {
            codeEditorRef.current = editor;
            emmetHTML(monaco);
          }}
          className="w-full h-1/2 md:h-full"
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
      </ResizableSection.LeftSide>
      <ResizableSection.RightSide>
        <div
          ref={codePreviewRef}
          className="w-full h-1/2 md:h-full overflow-scroll bg-white text-dimmed-black"
          dangerouslySetInnerHTML={{ __html: code }}
        ></div>
      </ResizableSection.RightSide>
    </ResizableSection>
  );
}
