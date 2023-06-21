"use client";

import { useRef } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";
import { CodeEditor } from "@/app/editor/components/CodeEditor";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";
import { useSearchParams } from "next/navigation";
import { DEFAULT_CODE_EDITOR_VALUE, HTML_CODE_SEARCH_PARAM } from "@/constants";
import { decode } from "@/utils/encode-decode-url";

export function EditorSection() {
  const searchParams = useSearchParams();
  const codeFromURL = searchParams.get(HTML_CODE_SEARCH_PARAM);

  const initialCode =
    codeFromURL != null ? decode(codeFromURL) : DEFAULT_CODE_EDITOR_VALUE;

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
