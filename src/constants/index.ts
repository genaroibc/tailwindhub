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

export const DEFAULT_CODE_EDITOR_VALUE = `<div class='bg--200 p-8 rounded shadow-2xl flex flex-col gap-2 text-center'>
<span class="font-semibold text-lg text-gray-800">Welcome to TailwindHub code editor</span>

<span class="font-semibold text-gray-800">Happy coding!</span>

<a href="https://github.com/genaroibc/tailwindhub" target="_blank" class="bg-yellow-300 w-fit mx-auto px-4 py-2 rounded-full mt-4">Visit on GitHub</a>
</div>`;
