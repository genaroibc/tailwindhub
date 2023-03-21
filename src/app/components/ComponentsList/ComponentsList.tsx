import { Database } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { ComponentItem } from "./ComponentItem/ComponentItem";
import styles from "./ComponentsList.module.css";

export const revalidate = 30;

export async function ComponentsList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data, error } = await supabase.from("components").select("*");

  console.log({ data, error });

  return (
    <section className={styles.components_list}>
      {Array.isArray(data) &&
        data.map((result) => <ComponentItem key={result.id} {...result} />)}
    </section>
  );
}
