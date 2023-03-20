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

  const { data, error } = await supabase
    .from("components")
    .select("*", { count: "exact", head: false });

  console.log({ data, error });

  return (
    <section className={styles.components_list}>
      {data?.map((result) => (
        <ComponentItem key={result.id} {...result} />
      ))}
      {JSON.stringify(
        [
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          process.env.NEXT_PUBLIC_SUPABASE_URL,
        ],
        null,
        2
      )}
    </section>
  );
}
