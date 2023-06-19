import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { type ComponentItem } from "@/types";
import { ComponentsList } from "@/app/(with-header)/components/ComponentsList/ComponentsList";

type PageProps = {
  params: { username: string; component: string };
};

export default async function ComponentPage({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase
    .from("components")
    .select("likes (author_username),*")
    .eq("author_username", params.username)
    .eq("title", params.component);

  return (
    <>
      {Array.isArray(data) && data && (
        <ComponentsList defaultComponents={data as ComponentItem[]} />
      )}
    </>
  );
}
