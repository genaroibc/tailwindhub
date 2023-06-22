import { encode } from "@/utils/encode-decode-url";
import { IconCode } from "@tabler/icons-react";
import { Code } from "bright";
import CustomTheme from "@/themes/CustomTheme.json";

Code.theme = CustomTheme;

type Props = {
  code: string;
};

export function ComponentCode({ code }: Props) {
  return (
    <section className="rounded-lg shadow-md">
      <a
        className="bg-slate-900 flex items-center max-w-fit gap-2 py-2 px-4 rounded-md"
        href={`/editor?html_code=${encode(code)}`}
      >
        <IconCode />
        Open in editor
      </a>

      <pre className="text-gray-200 overflow-x-auto">
        <Code lang="html">{code}</Code>
      </pre>
    </section>
  );
}
