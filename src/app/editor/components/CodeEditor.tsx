import { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE, LOCAL_STORAGE_KEYS } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { EditorLayout } from "@/app/editor/components/EditorLayout";
import BlackboardTheme from "@/themes/Blackboard.json";
import { registerTailwindCSSWorker } from "@/utils/register-tailwindcss-worker";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE_EDITOR_VALUE);
  const [wordWrap, setWordWrap] = useState(true);
  const [hasUnsavedProgress, setHasUnsavedProgress] = useState(false);

  const handleSaveCode = useCallback(() => {
    // @ts-ignore
    const codeToSave = codeEditorRef?.current?.getValue();

    if (codeToSave) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.HTML_CODE,
        JSON.stringify({ html_code: codeToSave })
      );
      setHasUnsavedProgress(false);
    }
  }, [codeEditorRef]);

  useEffect(() => {
    const listenKeyboard = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "z") {
        setWordWrap((currentWordWrap) => !currentWordWrap);
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();

        codeEditorRef.current
          // @ts-ignore
          ?.getAction?.("editor.action.formatDocument")
          .run?.();

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
      preview={
        <div
          ref={codePreviewRef}
          className="flex items-center justify-center w-full relative h-full overflow-auto bg-white text-dimmed-black [&_img]:inline-block"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      }
      editor={
        <Editor
          beforeMount={async (monaco) => {
            const { configureMonacoTailwindcss, tailwindcssData } =
              await import("monaco-tailwindcss");
            monaco.languages.css.cssDefaults.setOptions({
              data: {
                dataProviders: {
                  tailwindcssData,
                },
              },
            });

            configureMonacoTailwindcss(monaco, {});
          }}
          onMount={(editor, monaco) => {
            // @ts-ignore
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
