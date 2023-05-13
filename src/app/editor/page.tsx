import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://tailwindhub.dev/editor"),
  applicationName: "TailwindHub",
  colorScheme: "dark",
  title: "TailwindHub - Editor",
  description: "Create and share your own Tailwind components",
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
    title: "TailwindHub - Code editor to create and share Tailwind components",
    type: "website",
    description: "Create and share your own Tailwind components",
    images: "https://tailwindhub.dev/tailwindhub-editor.png",
    url: "https://tailwindhub.dev/editor",
  },
  twitter: {
    card: "summary_large_image",
    title: "TailwindHub - Code editor to create and share Tailwind components",
    description: "Create and share your own Tailwind components",
    images: ["https://tailwindhub.dev/tailwindhub-editor.png"],
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
