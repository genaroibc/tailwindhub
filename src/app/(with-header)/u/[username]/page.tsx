import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { type ComponentItem } from "@/types";
import { ComponentsList } from "@/app/(with-header)/components/ComponentsList/ComponentsList";
import { type Metadata } from "next";
import ENV from "@/constants/env";

type PageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;

  const BASE_URL = `https://${ENV.NEXT_PUBLIC_VERCEL_URL}`;
  const USER_PROFILE_URL = `${BASE_URL}/u/${username}`;
  const TITLE = `${username} - TailwindHub`;
  const DESCRIPTION = `Visit ${username} profile on TailwindHub`;

  const ogUrl = new URL(`${BASE_URL}/api/og`);
  ogUrl.searchParams.set("title", username || "");
  ogUrl.searchParams.set("username", username || "");
  ogUrl.searchParams.set(
    "image",
    "data:image/jpeg;base64,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"
  );

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
