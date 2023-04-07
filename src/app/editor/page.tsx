import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";
import { TailwindScript } from "@/app/components/shared/TailwindScript";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div className="bg-dimmed-black text-primary-color">
      <main className="max-w-page-max-width my-0 mx-auto">
        <TailwindScript />
        <EditorSection />
      </main>
    </div>
  );
}

export default HomePage;
