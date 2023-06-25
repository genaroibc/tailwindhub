import { encode } from "@/utils/encode-decode-url";
import { IconCode } from "@tabler/icons-react";
import { Code } from "bright";
import CustomTheme from "@/themes/CustomTheme.json";
import { CopyToClipboardButton } from "@/app/components/shared/CopyToClipboardButton";

Code.theme = CustomTheme;

type Props = {
  code: string;
};

export function ComponentCode({ code }: Props) {
  return (
    <section>
      <nav className="flex gap-4 items-center">
        <a
          className="bg-slate-900 flex items-center max-w-fit gap-2 py-2 px-4 rounded-md"
          href={`/editor?html_code=${encode(code)}`}
        >
          <IconCode />
          Open in editor
        </a>

        <CopyToClipboardButton
          textToCopy={code}
          className="bg-slate-900 flex items-center max-w-fit gap-2 py-2 px-4 rounded-md"
        >
          Copy
        </CopyToClipboardButton>
      </nav>

      <Code lang="html">{code}</Code>
    </section>
  );
}
