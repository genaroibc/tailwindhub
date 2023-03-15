import { Database } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { ComponentItem } from "./ComponentItem/ComponentItem";
import styles from "./ComponentsList.module.css";

export async function ComponentsList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase.from("components").select();

  return (
    <section className={styles.components_list}>
      {data?.map((result) => (
        <ComponentItem key={result.id} {...result} />
      ))}
    </section>
  );
}
