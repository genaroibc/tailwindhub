import { SearchFilter } from "@/types";

export const SEARCH_FILTERS: Array<{ value: SearchFilter; title: string }> = [
  { value: "all", title: "All categories" },
  { value: "button", title: "Buttons" },
  { value: "card", title: "Cards" },
  { value: "form", title: "Forms" },
  { value: "navbar", title: "Navigation bars" },
  { value: "input", title: "Inputs" },
  { value: "image", title: "Images" },
];
