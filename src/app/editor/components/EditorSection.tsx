"use client";

import { useRef } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";
import { CodeEditor } from "@/app/editor/components/CodeEditor";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";
import { useSearchParams } from "next/navigation";
import { DEFAULT_CODE_EDITOR_VALUE } from "@/constants";

export function EditorSection() {
  const searchParams = useSearchParams();
  const codeFromURL = searchParams.get("html_code");

  const initialCode =
    codeFromURL != null
      ? globalThis.atob(globalThis.decodeURIComponent(codeFromURL))
      : DEFAULT_CODE_EDITOR_VALUE;

  const codePreviewRef: CodePreviewRef = useRef(null);
  const codeEditorRef: CodeEditorRef = useRef(null);

  return (
    <section className="h-full w-full flex flex-col items-stretch justify-stretch relative overflow-hidden">
      <CodeEditorForm
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />

      <CodeEditor
        initialCode={initialCode}
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />
    </section>
  );
}
