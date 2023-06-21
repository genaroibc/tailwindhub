import { Suspense } from "react";
import { Hero } from "@/app/(with-header)/components/Hero";
import { type Metadata } from "next";
import { PageFooter } from "@/app/(with-header)/components/PageFooter";
import { BASE_URL } from "@/constants";
import { SearchSection } from "./components/SearchSection";
import { ComponentItemSkeleton } from "./components/ComponentsList/ComponentItem/ComponentItemSkeleton";

const TITLE = "TailwindHub - open-source Tailwind components";
const DESCRIPTION = "Free, open-source platform to share Tailwind components";
const IMAGE_URL = "https://tailwindhub.dev/tailwindhub.png";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE_URL],
  },
};

export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <Hero />

      <Suspense
        fallback={
          <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-8 w-full max-w-page-max-width my-0 mx-auto">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <ComponentItemSkeleton key={index} />
              ))}
          </section>
        }
      >
        <SearchSection />
      </Suspense>

      <PageFooter />
    </>
  );
}
