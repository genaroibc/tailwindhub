import { EditorLayout } from "@/types";
import {
  IconCode,
  IconEye,
  IconLayoutColumns,
  IconLayoutRows,
  IconTextResize,
} from "@tabler/icons-react";

const LAYOUT_OPTIONS: Array<{
  layoutName: EditorLayout;
  icon: React.ReactElement;
}> = [
  {
    layoutName: "preview-and-editor-columns",
    icon: <IconLayoutColumns width="1.5rem" height="1.5rem" />,
  },
  {
    layoutName: "preview-and-editor-rows",
    icon: <IconLayoutRows width="1.5rem" height="1.5rem" />,
  },
  {
    layoutName: "editor-only",
    icon: <IconCode size="1.5rem" />,
  },
  {
    layoutName: "preview-only",
    icon: <IconEye size="1.5rem" />,
  },
  {
    layoutName: "free-resize",
    icon: <IconTextResize size="1.5rem" />,
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
            selectedLayout === layoutName
              ? "text-blue-400 bg-blue-950"
              : "bg-transparent"
          } p-2 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-md
              ${
                layoutName === "preview-and-editor-columns"
                  ? "hidden lg:block"
                  : ""
              }
            `}
          key={layoutName}
          onClick={() => handleLayoutChange(layoutName)}
        >
          {icon}
        </button>
      ))}
    </nav>
  );
}
