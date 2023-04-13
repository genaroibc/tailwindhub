import { Database } from "./db";

export type SearchFilter =
  | "all"
  | "button"
  | "card"
  | "form"
  | "navbar"
  | "input"
  | "image";

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
