import { HTML_CODE_SEARCH_PARAM } from "@/constants";
import { encode } from "@/utils/encode-decode-url";
import { IconCheck, IconDeviceFloppy, IconShare } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  handleSaveCode: () => void;
  hasUnsavedProgress: boolean;
  code: string;
};

export function EditorActionsMenu({
  handleSaveCode,
  hasUnsavedProgress,
  code,
}: Props) {
  const [shared, setShared] = useState(false);

  const handleShareLink = () => {
    navigator.clipboard
      .writeText(
        `https://tailwindhub.dev/editor?${HTML_CODE_SEARCH_PARAM}=${encode(
          code
        )}`
      )
      .then(() => {
        setShared(true);
        setTimeout(() => {
          setShared(false);
        }, 3000);
      });
  };

  return (
    <menu className="flex items-center gap-2">
      <li>
        <button
          onClick={handleSaveCode}
          className={`
              bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md flex items-center justify-center gap-1
            ${
              hasUnsavedProgress
                ? "opacity-100 hover:bg-blue-600 active:bg-blue-700"
                : "opacity-70"
            }`}
          disabled={!hasUnsavedProgress}
        >
          Save <IconDeviceFloppy size={20} />
        </button>
      </li>

      <li>
        <button
          onClick={handleShareLink}
          className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md flex items-center justify-center gap-1 opacity-100 hover:bg-blue-600 active:bg-blue-700"
        >
          Share {shared ? <IconCheck size={20} /> : <IconShare size={20} />}
        </button>
      </li>
    </menu>
  );
}
