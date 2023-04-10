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

export const DEFAULT_CODE_EDITOR_VALUE = `<article class="auto px-8 py-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-md text-white shadow-2xl">
    <h1 class="text-2xl font-bold mb-4">Welcome to <span class="text-2xl">TailwindHub</span></h1>
    <p class="text-xl font-medium mb-8">The best place to share Tailwind components</p>

    <p class="mb-2 font-medium">Start by creating your component</p>
    <p class="mb-2 font-medium">When you're ready, sign in with GitHub and share it.</p>

    <a class="underline mt-6 block text-right cursor-pointer">Visit this project on GitHub</button>
</article>`;

export const COMPONENT_TAGS = [
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
  "icon",
  "navbar",
  "forms",
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
  "timeline",
  "datepicker",
  "dropdown",
];
