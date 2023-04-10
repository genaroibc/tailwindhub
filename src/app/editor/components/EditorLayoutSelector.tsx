"use client";

import {
  CodeIcon,
  EyeIcon,
  LayoutColumnsIcon,
} from "@/app/components/shared/Icons";
import { EditorLayout } from "@/types";

const LAYOUT_OPTIONS: Array<{
  layoutName: EditorLayout;
  icon: React.ReactElement;
}> = [
  { layoutName: "preview-and-editor-columns", icon: <LayoutColumnsIcon /> },
  { layoutName: "editor-only", icon: <CodeIcon /> },
  { layoutName: "preview-only", icon: <EyeIcon /> },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleLayoutChange: (layout: EditorLayout) => void;
};
export function EditorLayoutSelector({ handleLayoutChange }: Props) {
  return (
    <nav className="flex items-center">
      {LAYOUT_OPTIONS.map(({ icon, layoutName }) => (
        <button key={layoutName} onClick={() => handleLayoutChange(layoutName)}>
          {icon}
        </button>
      ))}
    </nav>
  );
}
