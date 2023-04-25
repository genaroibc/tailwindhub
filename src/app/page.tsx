import { Hero } from "@/app/components/Hero";
import { ComponentsList } from "@/app/components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/db";
import { ComponentItem } from "@/types";
import { Header } from "@/app/components/Header/Header";
import { PageFooter } from "@/app/components/PageFooter";

export const metadata: Metadata = {
  applicationName: "TailwindHub",
  colorScheme: "dark",
  title: "TailwindHub - UI components",
  description: "Free, open-source platform to share Tailwind components",
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
    title: "TailwindHub - open-source Tailwind components",
    type: "website",
    description: "Free, open-source platform to share Tailwind components",
    images: {
      url: "https://tailwindhub.dev/tailwindhub.png",
      width: 1200,
      height: 630,
    },
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
    <div>
      <Header />

      <Hero />
      {Array.isArray(data) && data && (
        <ComponentsList defaultComponents={data as ComponentItem[]} />
      )}

      <PageFooter />
    </div>
  );
}
