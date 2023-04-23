"use client";

import { useRef } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () =>
    import("@/app/editor/components/CodeEditor").then(
      (module) => module.CodeEditor
    ),
  {
    ssr: false,
    loading() {
      return (
        <p className="flex justify-center items-center w-full h-full">
          Loading...
        </p>
      );
    },
  }
);

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
