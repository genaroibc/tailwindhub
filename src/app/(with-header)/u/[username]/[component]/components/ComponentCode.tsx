import { Code } from "bright";
import CustomTheme from "@/themes/CustomTheme.json";

Code.theme = CustomTheme;

type Props = {
  code: string;
};

export function ComponentCode({ code }: Props) {
  return (
    <div className="[&>*]:!m-0">
      <Code lang="html">{code}</Code>
    </div>
  );
}
