"use client";

import { CodeEditor } from "@/app/editor/components/CodeEditor";
import { useRef } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";

export function EditorSection() {
  const codePreviewRef = useRef(null);
  const codeEditorRef = useRef(null);

  return (
    <section className="h-full w-full flex flex-col items-stretch justify-stretch relative">
      <CodeEditorForm
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />

      <CodeEditor
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />
    </section>
  );
}
