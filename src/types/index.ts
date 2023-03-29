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
