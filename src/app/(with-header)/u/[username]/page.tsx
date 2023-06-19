import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { ComponentsList } from "../../components/ComponentsList/ComponentsList";
import { type ComponentItem } from "@/types";
import { type Metadata } from "next";

type GenerateMetadataProps = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { username } = params;

  const USER_PROFILE_URL = `https://tailwindhub.dev/u/${username}`;
  const TITLE = `${username} - TailwindHub`;
  const DESCRIPTION = `Visit ${username} profile on TailwindHub`;

  return {
    metadataBase: new URL(USER_PROFILE_URL),
    applicationName: "TailwindHub",
    colorScheme: "dark",
    title: TITLE,
    description: DESCRIPTION,
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
      title: TITLE,
      type: "website",
      description: DESCRIPTION,
      images: "https://tailwindhub.dev/tailwindhub.png",
      url: USER_PROFILE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["https://tailwindhub.dev/tailwindhub.png"],
    },
  };
}

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
