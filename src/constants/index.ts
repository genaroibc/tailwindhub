export const DEFAULT_CODE_EDITOR_VALUE = `<article class="auto px-8 py-12 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-md text-white shadow-2xl">
    <h1 class="text-2xl font-bold mb-4">Welcome to <span class="text-2xl">TailwindHub</span></h1>
    <p class="text-xl font-medium mb-8">The best place to share Tailwind components</p>

    <p class="mb-2 font-medium">Start by creating your component</p>
    <p class="mb-2 font-medium">When you're ready, sign in with GitHub and share it.</p>

    <a class="underline mt-6 block text-right cursor-pointer">Visit this project on GitHub</button>
</article>`;

export const SUPABASE_ERRORS: Record<string, string> = {
  "23505": "Component already exists, choose a different title",
};

export enum LOCAL_STORAGE_KEYS {
  // eslint-disable-next-line no-unused-vars
  HTML_CODE = "__tailwindhub_html_code__",
}
