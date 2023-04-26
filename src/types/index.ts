import { Database } from "@/types/db";

export const COMPONENT_TAGS_LIST = [
  "all",
  "accordion",
  "alert",
  "badge",
  "breadcrumb",
  "button",
  "card",
  "carousel",
  "dashboard",
  "datepicker",
  "dropdown",
  "footer",
  "form",
  "header",
  "input",
  "layout",
  "login",
  "menu",
  "modal",
  "navbar",
  "navigation",
  "pagination",
  "select",
  "sidebar",
  "table",
  "timeline",
  "tooltip",
  "widget",
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
