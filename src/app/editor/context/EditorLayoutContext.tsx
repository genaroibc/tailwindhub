import { EditorLayout } from "@/types";
import { createContext, useContext, useState } from "react";

const DEFAULT_LAYOUT: EditorLayout = "preview-and-editor-columns";

type EditorLayoutContext = {
  layout: EditorLayout;
  setLayout: React.Dispatch<React.SetStateAction<EditorLayout>>;
};

const LayoutContext = createContext<EditorLayoutContext>({
  layout: DEFAULT_LAYOUT,
  setLayout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function EditorLayoutContextProvider({ children }: Props) {
  const [layout, setLayout] = useState<EditorLayout>(DEFAULT_LAYOUT);
  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export const useEditorLayout = () => {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error(
      "'useEditorLayout' hook must be used within a LayoutContextProvider"
    );
  }

  return context;
};
