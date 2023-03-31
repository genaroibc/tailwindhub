import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";
import { TailwindScript } from "@/app/components/shared/TailwindScript";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div>
      <TailwindScript />
      <EditorSection />
    </div>
  );
}

export default HomePage;
