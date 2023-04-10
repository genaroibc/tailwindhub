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
  {
    layoutName: "preview-and-editor-columns",
    icon: <LayoutColumnsIcon width="1.5rem" height="1.5rem" />,
  },
  {
    layoutName: "editor-only",
    icon: <CodeIcon width="1.5rem" height="1.5rem" />,
  },
  {
    layoutName: "preview-only",
    icon: <EyeIcon width="1.5rem" height="1.5rem" />,
  },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleLayoutChange: (layout: EditorLayout) => void;
  selectedLayout: EditorLayout;
};

export function EditorLayoutSelector({
  handleLayoutChange,
  selectedLayout,
}: Props) {
  return (
    <nav className="flex items-center p-2 gap-2 justify-end">
      {LAYOUT_OPTIONS.map(({ icon, layoutName }) => (
        <button
          className={`${
            selectedLayout === layoutName ? "text-blue-400" : ""
          } bg-slate-950 p-2 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-md`}
          key={layoutName}
          onClick={() => handleLayoutChange(layoutName)}
        >
          {icon}
        </button>
      ))}
    </nav>
  );
}
