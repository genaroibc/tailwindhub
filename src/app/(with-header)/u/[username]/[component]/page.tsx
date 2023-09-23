import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { type Database } from "@/types/db";
import { type ComponentItem as TComponentItem } from "@/types";
import { unsluglify } from "@/utils/url-formatting";
import { ComponentPage } from "./components/ComponentPage";
import { Metadata } from "next";
import { BASE_URL } from "@/constants";
import { notFound } from "next/navigation";

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

  if (data == null || data.length === 0) {
    return notFound();
  }

  return (
    <main>
      {Array.isArray(data) && data != null && (
        <ComponentPage {...(data[0] as TComponentItem)} />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username, component } = params;
  const componentTitle = unsluglify(component);

  const COMPONENT_PAGE_URL = `${BASE_URL}/u/${username}/${componentTitle}`;
  const TITLE = `${componentTitle} - TailwindHub`;
  const DESCRIPTION = `${componentTitle} by ${username}`;

  const ogUrl = new URL(`${BASE_URL}/api/og`);
  ogUrl.searchParams.set("username", username || "");
  ogUrl.searchParams.set("component", componentTitle || "");

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
      url: COMPONENT_PAGE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [ogUrl.toString()],
    },
    metadataBase: new URL(COMPONENT_PAGE_URL),
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
