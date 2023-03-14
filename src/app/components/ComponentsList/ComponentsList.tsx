import { Database } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { ComponentItem } from "./ComponentItem/ComponentItem";
import styles from "./ResultList.module.css";

export async function ComponentsList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  console.log("ok");
  const { data, error } = await supabase.from("components").select();

  console.log({ data, error });

  return (
    <section className={styles.components_list}>
      {data?.map((result) => (
        <ComponentItem key={result.id} {...result} />
      ))}
    </section>
  );
}
