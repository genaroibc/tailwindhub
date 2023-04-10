import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";
import { TailwindScript } from "@/app/components/shared/TailwindScript";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div className="grid grid-rows-[3rem,100vh] bg-dimmed-black text-primary-color w-screen h-screen max-w-screen">
      <header className="flex gap-4 p-2 items-center justify-center"></header>
      <main className="max-h-[calc(100vh-3rem)] h-full">
        <TailwindScript />
        <EditorSection />
      </main>
    </div>
  );
}

export default HomePage;
