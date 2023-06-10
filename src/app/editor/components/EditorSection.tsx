"use client";

import { useRef } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";
import { CodeEditor } from "@/app/editor/components/CodeEditor";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";

export function EditorSection() {
  const codePreviewRef: CodePreviewRef = useRef(null);
  const codeEditorRef: CodeEditorRef = useRef(null);

  return (
    <section className="h-full w-full flex flex-col items-stretch justify-stretch relative overflow-hidden">
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
