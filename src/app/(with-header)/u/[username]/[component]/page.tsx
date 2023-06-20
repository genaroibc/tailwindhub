import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { type ComponentItem as TComponentItem } from "@/types";
import { unsluglify } from "@/utils/url-formatting";
import { ComponentPage } from "./components/ComponentPage";

type PageProps = {
  params: { username: string; component: string };
};

export default async function Page({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase
    .from("components")
    .select("likes (author_username),*")
    .eq("author_username", params.username)
    .eq("title", unsluglify(params.component));

  return (
    <main>
      {Array.isArray(data) && data != null && (
        <ComponentPage {...(data[0] as TComponentItem)} />
      )}
    </main>
  );
}
