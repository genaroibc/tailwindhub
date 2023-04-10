"use client";

import {
  CodeIcon,
  EyeIcon,
  LayoutColumnsIcon,
} from "@/app/components/shared/Icons";
import { EditorLayout } from "@/types";
import { useEditorLayout } from "../context/EditorLayoutContext";

const LAYOUT_OPTIONS: Array<{
  layoutName: EditorLayout;
  icon: React.ReactElement;
}> = [
  { layoutName: "preview-and-editor-columns", icon: <LayoutColumnsIcon /> },
  { layoutName: "editor-only", icon: <CodeIcon /> },
  { layoutName: "preview-only", icon: <EyeIcon /> },
];

export function EditorLayoutSelector() {
  const { setLayout } = useEditorLayout();
  return (
    <nav className="flex items-center">
      {LAYOUT_OPTIONS.map(({ icon, layoutName }) => (
        <button key={layoutName} onClick={() => setLayout(layoutName)}>
          {icon}
        </button>
      ))}
    </nav>
  );
}
