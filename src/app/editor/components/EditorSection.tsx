"use client";

import { useRef } from "react";
import { CodeEditor } from "@/app/editor/components/CodeEditor";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";

type Props = {
  initialCode: string;
};

export function EditorSection({ initialCode }: Props) {
  const codePreviewRef: CodePreviewRef = useRef(null);
  const codeEditorRef: CodeEditorRef = useRef(null);

  return (
    <section className="h-full w-full flex flex-col items-stretch justify-stretch relative overflow-hidden">
      <CodeEditor
        initialCode={initialCode}
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />
    </section>
  );
}
