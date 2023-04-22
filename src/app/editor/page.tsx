import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";
import { TailwindScript } from "@/app/components/shared/TailwindScript";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <main className="grid grid-rows-1 bg-dimmed-black text-primary-color w-screen h-screen max-w-screen">
      <TailwindScript />
      <EditorSection />
    </main>
  );
}

export default HomePage;
