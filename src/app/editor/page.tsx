import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div>
      <CodeEditor />
    </div>
  );
}

export default HomePage;
