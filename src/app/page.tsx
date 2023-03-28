import styles from "@/app/page.module.css";
import { Hero } from "./components/Hero/Hero";
import { ComponentsList } from "./components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/db";

export const metadata: Metadata = {
  title: "TailwindHub - UI components",
  description: "The best place to share Tailwind components",
};

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase.from("components").select("*");

  return (
    <div className={styles.container}>
      <Hero />
      {Array.isArray(data) && <ComponentsList defaultComponents={data} />}
    </div>
  );
}
