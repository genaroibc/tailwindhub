import { ConstrainSize } from "@/app/editor/types";

type Props = {
  code: string;
  isResizing?: boolean;
  constrainedResponsiveSize: ConstrainSize;
};

export function IframePreview({
  isResizing,
  code,
  constrainedResponsiveSize,
}: Props) {
  return (
    <iframe
      className={isResizing ? "pointer-events-none select-none" : ""}
      style={{
        width: constrainedResponsiveSize.width,
        height: constrainedResponsiveSize.height,
        marginLeft:
          (constrainedResponsiveSize.width -
            Math.round(
              constrainedResponsiveSize.width * constrainedResponsiveSize.zoom
            )) /
          -2,
        transformOrigin: "top",
        transform: `scale(${constrainedResponsiveSize.zoom})`,
      }}
      srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Preview</title>
  <script src="/tailwind-3.2.6.min.js"></script>
</head>
<body class="flex min-h-[400px] items-center p-4 justify-center w-full relative h-full overflow-auto bg-white text-dimmed-black ![&_img]:inline-block inset-0">
  ${code}
</body>
</html>`}
    />
  );
}
