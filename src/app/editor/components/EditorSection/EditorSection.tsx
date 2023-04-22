"use client";

import { CodeEditor } from "@/app/editor/components/CodeEditor/CodeEditor";
import { useRef } from "react";
import { CodeEditorForm } from "../CodeEditorForm/CodeEditorForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function EditorSection() {
  const codePreviewRef = useRef(null);
  const codeEditorRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const tailwindScript = document.createElement("script");

    tailwindScript.src = "/tailwind-3.2.6.min.js";
    tailwindScript.async = true;

    document.body.appendChild(tailwindScript);

    return () => {
      document.body.removeChild(tailwindScript);
    };
  }, [router]);

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
