import { useCallback, useEffect, useState } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE, LOCAL_STORAGE_KEYS } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { EditorLayout } from "@/app/editor/components/EditorLayout";
import BlackboardTheme from "@/themes/Blackboard.json";
import { registerTailwindCSSWorker } from "@/utils/register-tailwindcss-worker";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";
import { Preview } from "@/app/editor/components/Preview/Preview";

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  codePreviewRef: CodePreviewRef;
  codeEditorRef: CodeEditorRef;
  isResizable?: boolean;
};

export function CodeEditor({ codeEditorRef, isResizable }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);
  const [wordWrap, setWordWrap] = useState(true);
  const [hasUnsavedProgress, setHasUnsavedProgress] = useState(false);

  const handleSaveCode = useCallback(() => {
    const codeToSave = codeEditorRef.current?.getValue();

    if (codeToSave) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.HTML_CODE,
        JSON.stringify({ html_code: codeToSave })
      );
      setHasUnsavedProgress(false);
    }
  }, [codeEditorRef]);

  const handleConfigureIntellisense = useCallback(async (monaco: Monaco) => {
    const { cssDefaults } = monaco.languages.css;

    if (cssDefaults.options.data?.dataProviders?.tailwindcssData) return;

    const { configureMonacoTailwindcss, tailwindcssData } = await import(
      "monaco-tailwindcss"
    );

    cssDefaults.setOptions({
      data: {
        dataProviders: {
          tailwindcssData,
        },
      },
    });
    configureMonacoTailwindcss(monaco, {});
  }, []);

  useEffect(() => {
    const listenKeyboard = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "z") {
        setWordWrap((currentWordWrap) => !currentWordWrap);
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();

        codeEditorRef.current
          ?.getAction?.("editor.action.formatDocument")
          ?.run?.();

        handleSaveCode();
      }
    };

    document.addEventListener("keydown", listenKeyboard);

    return () => document.removeEventListener("keydown", listenKeyboard);
  }, [codeEditorRef, handleSaveCode]);

  useEffect(() => {
    const checkForUnsavedProgress = (e: BeforeUnloadEvent) => {
      if (hasUnsavedProgress) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", checkForUnsavedProgress);

    return () => {
      window.removeEventListener("beforeunload", checkForUnsavedProgress);
    };
  }, [hasUnsavedProgress]);

  useEffect(() => {
    registerTailwindCSSWorker();
    const { html_code: INITIAL_CODE_EDITOR_VALUE } = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.HTML_CODE) ?? "{}"
    );

    if (INITIAL_CODE_EDITOR_VALUE) setCode(INITIAL_CODE_EDITOR_VALUE);
  }, []);

  return (
    <EditorLayout
      preview={<Preview isResizable={isResizable} code={code} />}
      editor={
        <MonacoEditor
          beforeMount={(monaco) => handleConfigureIntellisense(monaco)}
          onMount={(editor, monaco) => {
            codeEditorRef.current = editor;
            // @ts-ignore
            monaco.editor?.defineTheme?.("Blackboard", BlackboardTheme);
            monaco.editor?.setTheme?.("Blackboard");
            emmetHTML(monaco);
          }}
          className="w-full h-full"
          theme="vs-dark"
          defaultLanguage="html"
          defaultValue={code}
          onChange={(code) => {
            setCode(code ?? "");
            setHasUnsavedProgress(true);
          }}
          line={2}
          loading={<Loader color="var(--primary-color, #fff)" />}
          options={{
            minimap: { enabled: false },
            wordWrap: wordWrap ? "on" : "off",
          }}
        />
      }
      hasUnsavedProgress={hasUnsavedProgress}
      handleSaveCode={handleSaveCode}
    />
  );
}
