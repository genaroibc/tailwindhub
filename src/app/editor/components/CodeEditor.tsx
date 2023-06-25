import { useCallback, useEffect, useState } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { HTML_CODE_SEARCH_PARAM, LOCAL_STORAGE_KEYS } from "@/constants";
import { emmetHTML } from "emmet-monaco-es";
import BlackboardTheme from "@/themes/Blackboard.json";
import { registerTailwindCSSWorker } from "@/utils/register-tailwindcss-worker";
import { CodeEditorRef, CodePreviewRef } from "@/app/editor/types";
import { Preview } from "@/app/editor/components/Preview/Preview";
import { EditorLayout } from "@/types";
import { HomeLink } from "@/app/components/shared/HomeLink";
import { EditorLayoutSelector } from "./EditorLayoutSelector";
import { ResizableSection } from "./ResizableSection";
import { debounce } from "@/utils/debounce";
import { EditorActionsMenu } from "./EditorActionsMenu";

const DEFAULT_LAYOUT: EditorLayout = "preview-and-editor-columns";

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  codePreviewRef: CodePreviewRef;
  codeEditorRef: CodeEditorRef;
  initialCode: string;
};

export function CodeEditor({
  codeEditorRef,
  codePreviewRef,
  initialCode,
}: Props) {
  const [code, setCode] = useState(initialCode);
  const [wordWrap, setWordWrap] = useState(true);
  const [hasUnsavedProgress, setHasUnsavedProgress] = useState(false);
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);
  const [isResizable, setIsResizable] = useState(false);

  const handleLayoutChange = (layout: EditorLayout) => {
    setLayout(layout);
  };

  const handleFormatCode = useCallback(() => {
    codeEditorRef.current?.getAction?.("editor.action.formatDocument")?.run?.();
  }, [codeEditorRef]);

  const handleSaveCode = useCallback(() => {
    handleFormatCode();

    setTimeout(() => {
      const codeToSave = codeEditorRef.current?.getValue();

      if (codeToSave != null) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.HTML_CODE,
          JSON.stringify({ html_code: codeToSave })
        );
        setHasUnsavedProgress(false);
      }
    }, 800);
  }, [codeEditorRef, handleFormatCode]);

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

    const isThereCodeInURL =
      new URLSearchParams(window.location.search).get(HTML_CODE_SEARCH_PARAM) !=
      null;

    if (isThereCodeInURL) return;

    const { html_code: INITIAL_CODE_EDITOR_VALUE } = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.HTML_CODE) ?? "{}"
    );

    if (INITIAL_CODE_EDITOR_VALUE != null) setCode(INITIAL_CODE_EDITOR_VALUE);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleChange = useCallback(
    debounce(
      (code?: string) => {
        setCode(code ?? "");
        setHasUnsavedProgress(true);
      },
      500,
      false
    ),
    [setCode, setHasUnsavedProgress]
  );

  const Editor = (
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
      onChange={debouncedHandleChange}
      line={2}
      loading={<p>loading editor...</p>}
      options={{
        minimap: { enabled: false },
        wordWrap: wordWrap ? "on" : "off",
      }}
    />
  );

  return (
    <>
      <header className="bg-slate-950 flex flex-wrap items-center justify-between gap-2 px-4">
        <nav className="flex gap-2 justify-between items-center w-full">
          <HomeLink />

          <EditorLayoutSelector
            handleLayoutChange={handleLayoutChange}
            selectedLayout={layout}
            onIsResizableChange={(isResizable) => setIsResizable(isResizable)}
          />

          <EditorActionsMenu
            code={code}
            handleSaveCode={handleSaveCode}
            hasUnsavedProgress={hasUnsavedProgress}
          />
        </nav>
      </header>

      {(layout === "preview-and-editor-columns" ||
        layout === "preview-and-editor-rows") && (
        <ResizableSection
          desktopLayout={
            layout === "preview-and-editor-columns" ? "columns" : "rows"
          }
        >
          <ResizableSection.LeftSide>{Editor}</ResizableSection.LeftSide>
          <ResizableSection.RightSide>
            {
              <Preview
                codePreviewRef={codePreviewRef}
                isResizable={isResizable}
                code={code}
              />
            }
          </ResizableSection.RightSide>
        </ResizableSection>
      )}
      {layout === "preview-only" && (
        <>
          {
            <Preview
              codePreviewRef={codePreviewRef}
              isResizable={isResizable}
              code={code}
            />
          }
        </>
      )}
      {layout === "editor-only" && <>{Editor}</>}
    </>
  );
}
