export function registerTailwindCSSWorker() {
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (window.MonacoEnvironment) return;
  // @ts-ignore
  window.MonacoEnvironment = {
    getWorker(moduleId: string, label: string) {
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
            new URL("./tailwindcss.worker.js", import.meta.url)
          );
        default:
          throw new Error(`Unknown label ${label}`);
      }
    },
  };
}
