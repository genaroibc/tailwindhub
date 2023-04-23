export function registerTailwindCSSWorker() {
  if (window.MonacoEnvironment) return;
  window.MonacoEnvironment = {
    getWorker(moduleId, label) {
      switch (label) {
        case "editorWorkerService":
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/editor/editor.worker",
              import.meta.url
            )
          );
        case "html":
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/html/html.worker",
              import.meta.url
            )
          );
        case "tailwindcss":
          return new Worker(
            new URL("monaco-tailwindcss/tailwindcss.worker", import.meta.url)
          );
        default:
          throw new Error(`Unknown label ${label}`);
      }
    },
  };
}
