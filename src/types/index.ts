import { Database } from "@/types/db";

export const COMPONENT_TAGS_LIST = [
  "all",
  "button",
  "card",
  "form",
  "navbar",
  "input",
  "timeline",
  "form",
  "menu",
  "table",
  "modal",
  "badge",
  "widget",
  "alert",
  "login",
  "input",
  "layout",
  "card",
  "navbar",
  "header",
  "sidebar",
  "select",
  "tooltip",
  "button",
  "footer",
  "carousel",
  "navigation",
  "dashboard",
  "accordion",
  "breadcrumb",
  "pagination",
  "datepicker",
  "dropdown",
] as const;

export type ComponentTag = (typeof COMPONENT_TAGS_LIST)[number];

export type KnownError = { ok: false; error: string };
export type KnownResponse<T> = { ok: true; data: T };
export type KnownResult<T> = KnownResponse<T> | KnownError;

export type ComponentData = {
  code: string;
  title: string;
  imageDataURL: string;
};

export type ComponentItem =
  Database["public"]["Tables"]["components"]["Row"] & {
    likes: Array<Database["public"]["Tables"]["likes"]["Row"]>;
  };

export type EditorLayout =
  | "preview-and-editor-columns"
  | "preview-and-editor-rows"
  | "editor-only"
  | "preview-only";

export type SearchData = {
  query: string;
  selectedTag: string;
};
