import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/db";
import { ComponentsList } from "../../components/ComponentsList/ComponentsList";
import { ComponentItem } from "@/types";

export const revalidate = 60;

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase
    .from("components")
    .select("likes (author_username),*")
    .eq("author_username", params.username);

  return (
    <main>
      <h1>Welcome {params.username}</h1>

      {Array.isArray(data) && data && (
        <ComponentsList defaultComponents={data as ComponentItem[]} />
      )}
    </main>
  );
}
