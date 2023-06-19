import { Hero } from "@/app/(with-header)/components/Hero";
import { ComponentsList } from "@/app/(with-header)/components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/db";
import { ComponentItem } from "@/types";
import { PageFooter } from "@/app/(with-header)/components/PageFooter";
import { BASE_URL } from "@/constants";

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
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase
    .from("components")
    .select("likes (author_username),*");

  return (
    <>
      <Hero />
      {Array.isArray(data) && data && (
        <ComponentsList defaultComponents={data as ComponentItem[]} />
      )}

      <PageFooter />
    </>
  );
}
