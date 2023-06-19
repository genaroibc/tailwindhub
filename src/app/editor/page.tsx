import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection";

const EDITOR_PAGE_URL = "https://tailwindhub.dev/editor";
const TITLE = "TailwindHub - Editor";
const IMAGE_URL = "https://tailwindhub.dev/tailwindhub-editor.png";
const DESCRIPTION = "Create and share your own Tailwind components";

export const metadata: Metadata = {
  metadataBase: new URL(EDITOR_PAGE_URL),
  applicationName: "TailwindHub",
  colorScheme: "dark",
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "tailwind",
    "tailwindcss",
    "components",
    "ui",
    "tailwind components",
    "tailwind playground",
    "components kit",
    "components library",
    "tailwind library",
    "tailwind kit",
    "tailwind ui",
    "tailwind open-source",
    "tailwind editor",
  ],
  openGraph: {
    title: TITLE,
    type: "website",
    description: DESCRIPTION,
    images: IMAGE_URL,
    url: EDITOR_PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE_URL],
  },
};

function HomePage() {
  return (
    <main className="grid grid-rows-1 bg-dimmed-black text-primary-color w-screen h-screen max-w-screen">
      <EditorSection />
    </main>
  );
}

export default HomePage;
