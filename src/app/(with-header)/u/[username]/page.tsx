import { type Metadata } from "next";
import { BASE_URL } from "@/constants";
import { Icon3dCubeSphere, IconHeart } from "@tabler/icons-react";
import { createClient } from "@supabase/supabase-js";
import ENV from "@/constants/env";
import { notFound } from "next/navigation";
import { ComponentsList } from "@/app/(with-header)/components/ComponentsList/ComponentsList";
import { ComponentItem } from "@/types";
import { UserMetadata } from "@/types/user";

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
  const supabaseAdmin = createClient(
    ENV.NEXT_PUBLIC_SUPABASE_URL,
    ENV.SUPABASE_SERVICE_ROLE_KEY
  );

  const allUsers = await supabaseAdmin.auth.admin.listUsers();
  const userData = allUsers.data.users.find(
    (u) => u.user_metadata.user_name === params.username
  )?.user_metadata as UserMetadata | undefined;

  if (userData == null) {
    return notFound();
  }

  const { data } = await supabaseAdmin
    .from("components")
    .select("likes (author_username),*")
    .eq("author_username", params.username);

  const userComponents = data as ComponentItem[];

  return (
    <main>
      <section className="relative bg-slate-950 px-4 py-20 flex flex-col gap-4 items-center">
        <div className="max-w-page-max-width mx-auto">
          <article className="flex flex-col items-center gap-2 mt-4 mb-8">
            <img
              className="bg-cover aspect-square rounded-full mb-4"
              src={userData.avatar_url}
              width={120}
              height={120}
              alt={userData.user_name}
            />

            <h1 className="text-3xl text-gray-100">{userData.name}</h1>
            <h2 className="text-xl text-gray-400">@{userData.user_name}</h2>
          </article>

          <nav className="mx-auto">
            <ul className="flex gap-4 items-center justify-center">
              <li className="flex items-center gap-2">
                0
                <IconHeart />
              </li>
              <li className="flex items-center gap-2">
                {userComponents.length}
                <Icon3dCubeSphere />
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <div>
        {Array.isArray(data) && data && (
          <ComponentsList
            authorUsername={params.username}
            defaultComponents={userComponents}
          />
        )}
      </div>
    </main>
  );
}
