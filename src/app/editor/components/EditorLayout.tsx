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
      {layout === "preview-and-editor-columns" && (
        <ResizableSection className="overflow-hidden w-full h-full grid-cols-1 grid-rows-2 md:grid-rows-1 grid md:grid-cols-2">
          <ResizableSection.LeftSide>{editor}</ResizableSection.LeftSide>
          <ResizableSection.RightSide>{preview}</ResizableSection.RightSide>
        </ResizableSection>
      )}
      {layout === "preview-only" && <> {preview}</>}
      {layout === "editor-only" && <>{editor}</>}
    </>
  );
}
