import { TailwindHubLogo } from "@/app/components/shared/Icons";
import { EditorLayout } from "@/types";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { EditorLayoutSelector } from "@/app/editor/components/EditorLayoutSelector";
import { ResizableSection } from "@/app/editor/components/ResizableSection";

const DEFAULT_LAYOUT: EditorLayout = "preview-and-editor-columns";

type Props = {
  editor: React.ReactNode;
  preview: React.ReactNode;
  handleSaveCode: () => void;
  hasUnsavedProgress: boolean;
};

export function EditorLayout({
  editor,
  preview,
  hasUnsavedProgress,
  handleSaveCode,
}: Props) {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  const handleLayoutChange = (layout: EditorLayout) => {
    setLayout(layout);
  };

  return (
    <>
      <header className="bg-slate-950 flex flex-wrap items-center justify-between gap-2 px-4">
        <nav className="flex gap-2 justify-between items-center w-full">
          <Link href="/">
            <span className="font-bold flex items-center justify-center gap-2">
              <TailwindHubLogo />
              <span className="hidden sm:block">TailwindHub</span>
            </span>
          </Link>
          <button
            onClick={handleSaveCode}
            className={`
            bg-blue-500 text-white px-2 py-1 rounded-md flex items-center justify-center gap-1
            ${
              hasUnsavedProgress
                ? "opacity-100 hover:bg-blue-600 active:bg-blue-700"
                : "opacity-70"
            }`}
            disabled={!hasUnsavedProgress}
          >
            Save <IconDeviceFloppy />
          </button>

          <EditorLayoutSelector
            handleLayoutChange={handleLayoutChange}
            selectedLayout={layout}
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
          <ResizableSection.LeftSide>{editor}</ResizableSection.LeftSide>
          <ResizableSection.RightSide>{preview}</ResizableSection.RightSide>
        </ResizableSection>
      )}
      {layout === "preview-only" && <>{preview}</>}
      {layout === "editor-only" && <>{editor}</>}
    </>
  );
}
