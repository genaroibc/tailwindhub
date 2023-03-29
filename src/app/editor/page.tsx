import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div>
      <EditorSection />
    </div>
  );
}

export default HomePage;
