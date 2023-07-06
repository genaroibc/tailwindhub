import { Breakpoint } from "@/app/editor/types";

export const breakpoints: Record<string, Breakpoint> = {
  mobile: { width: 375, height: 1024 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 1024 },
  desktop: { width: 1440, height: 1024 },
};
