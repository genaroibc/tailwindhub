import { EditorLayout } from "@/types";
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
      <EditorLayoutSelector
        handleLayoutChange={handleLayoutChange}
        selectedLayout={layout}
      />
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
