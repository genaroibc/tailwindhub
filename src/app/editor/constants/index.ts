import { Breakpoint } from "@/app/editor/types";

export const breakpoints: Record<string, Breakpoint> = {
  mobile: { width: 375, height: 1024 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 1024 },
  desktop: { width: 1440, height: 1024 },
};

export const CODE_PREVIEW_CONTAINER_CLASSNAME =
  "min-h-[400px] p-4 w-full relative h-full overflow-auto bg-white text-dimmed-black ![&_img]:inline-block inset-0";
