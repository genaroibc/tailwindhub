import { SpinnerLoader } from "@/app/components/shared/SpinnerLoader";
import { HTML_CODE_SEARCH_PARAM } from "@/constants";
import { encode } from "@/utils/encode-decode-url";
import { IconCheck, IconDeviceFloppy, IconShare } from "@tabler/icons-react";
import { useState } from "react";
import { CodeEditorForm } from "@/app/editor/components/CodeEditorForm";
import { CodeEditorRef, CodePreviewRef } from "../types";
import { Button } from "@/app/(with-header)/components/shared/Button";

type Props = {
  handleSaveCode: () => void;
  isSavingCode: boolean;
  hasUnsavedProgress: boolean;
  code: string;
  codeEditorRef: CodeEditorRef;
  codePreviewRef: CodePreviewRef;
};

export function EditorActionsMenu({
  handleSaveCode,
  hasUnsavedProgress,
  code,
  isSavingCode,
  codeEditorRef,
  codePreviewRef,
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
        <Button
          onClick={handleSaveCode}
          className="text-xs gap-1 font-semibold"
          disabled={!hasUnsavedProgress || isSavingCode}
        >
          {isSavingCode ? (
            <>
              Saving <SpinnerLoader size={20} />
            </>
          ) : (
            <>
              Save <IconDeviceFloppy size={20} />
            </>
          )}
        </Button>
      </li>

      <li>
        <Button
          onClick={handleShareLink}
          className="text-xs gap-1 font-semibold"
        >
          Share {shared ? <IconCheck size={20} /> : <IconShare size={20} />}
        </Button>
      </li>

      <CodeEditorForm
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />
    </menu>
  );
}
