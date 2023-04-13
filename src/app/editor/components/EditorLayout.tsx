import { TailwindHubLogo } from "@/app/components/shared/Icons";
import { EditorLayout } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { EditorLayoutSelector } from "./EditorLayoutSelector";
import { ResizableSection } from "./ResizableSection";

const DEFAULT_LAYOUT: EditorLayout = "preview-and-editor-columns";

type Props = {
  editor: React.ReactNode;
  preview: React.ReactNode;
};

export function EditorLayout({ editor, preview }: Props) {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  const handleLayoutChange = (layout: EditorLayout) => {
    setLayout(layout);
  };

  return (
    <>
      <header className="bg-slate-950 flex flex-wrap items-center justify-between gap-2 px-4">
        <nav className="flex gap-2 items-center">
          <Link href="/">
            <span className="font-bold flex items-center justify-center gap-2">
              <TailwindHubLogo />
              <span className="hidden sm:block">TailwindHub</span>
            </span>
          </Link>
        </nav>
        <EditorLayoutSelector
          handleLayoutChange={handleLayoutChange}
          selectedLayout={layout}
        />
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
      {layout === "preview-only" && <> {preview}</>}
      {layout === "editor-only" && <>{editor}</>}
    </>
  );
}
