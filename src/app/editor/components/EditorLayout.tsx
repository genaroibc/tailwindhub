import { useEditorLayout } from "../context/EditorLayoutContext";
import { ResizableSection } from "./ResizableSection";

type Props = {
  editor: React.ReactNode;
  preview: React.ReactNode;
};

export function EditorLayout({ editor, preview }: Props) {
  const { layout } = useEditorLayout();

  return (
    <>
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
