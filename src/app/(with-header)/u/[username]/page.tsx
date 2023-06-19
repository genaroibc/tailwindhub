import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { type ComponentItem } from "@/types";
import { ComponentsList } from "@/app/(with-header)/components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import { BASE_URL } from "@/constants";

type PageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;

  const USER_PROFILE_URL = `${BASE_URL}/u/${username}`;
  const TITLE = `${username} - TailwindHub`;
  const DESCRIPTION = `Visit ${username}'s profile on TailwindHub`;

  const ogUrl = new URL(`${BASE_URL}/api/og`);
  ogUrl.searchParams.set("username", username || "");
  ogUrl.searchParams.set("image", `https://github.com/${username}.png`);

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: username,
        },
      ],
      title: TITLE,
      type: "article",
      description: DESCRIPTION,
      url: USER_PROFILE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [ogUrl.toString()],
    },
    metadataBase: new URL(USER_PROFILE_URL),
    applicationName: "TailwindHub",
    colorScheme: "dark",
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
  };
}

export const revalidate = 60;

export default async function UserPage({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });

  const { data } = await supabase
    .from("components")
    .select("likes (author_username),*")
    .eq("author_username", params.username);

  return (
    <>
      {Array.isArray(data) && data && (
        <ComponentsList defaultComponents={data as ComponentItem[]} />
      )}
    </>
  );
}
