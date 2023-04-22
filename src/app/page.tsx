import { Hero } from "@/app/components/Hero/Hero";
import { ComponentsList } from "@/app/components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/db";
import { ComponentItem } from "@/types";
import { Header } from "@/app/components/Header/Header";
import { PageFooter } from "@/app/components/PageFooter";

export const metadata: Metadata = {
  title: "TailwindHub - UI components",
  description: "The best place to share Tailwind components",
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
