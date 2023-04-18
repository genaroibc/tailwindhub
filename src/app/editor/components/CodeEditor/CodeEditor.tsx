import { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE_EDITOR_VALUE, LOCAL_STORAGE_KEYS } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { EditorLayout } from "../EditorLayout";
import BlackboardTheme from "@/themes/Blackboard.json";

type Props = {
  codePreviewRef: React.MutableRefObject<null>;
  codeEditorRef: React.MutableRefObject<null>;
};

const { html_code: INITIAL_CODE_EDITOR_VALUE = DEFAULT_CODE_EDITOR_VALUE } =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.HTML_CODE) ?? "{}");

export function CodeEditor({ codeEditorRef, codePreviewRef }: Props) {
  const [code, setCode] = useState(INITIAL_CODE_EDITOR_VALUE);
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
        handleSaveCode();
      }
    };

    document.addEventListener("keydown", listenKeyboard);

    return () => document.removeEventListener("keydown", listenKeyboard);
  }, [handleSaveCode]);

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

  return (
    <EditorLayout
      preview={
        <div
          ref={codePreviewRef}
          className="flex items-center justify-center w-full relative h-full overflow-auto bg-white text-dimmed-black"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      }
      editor={
        <Editor
          onMount={(editor, monaco) => {
            codeEditorRef.current = editor;
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
