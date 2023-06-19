import { UserMetadata } from "@/types/user";
import { createClient } from "@supabase/supabase-js";
import { UserCard } from "./components/UserCard";
import ENV from "@/constants/env";
import { Metadata } from "next";
import { BASE_URL } from "@/constants";

const TITLE = "Users - TailwindHub";
const DESCRIPTION =
  "Visit user profiles and discover amazing creators on TailwindHub";
const IMAGE_URL = `${BASE_URL}/tailwindhub-users.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    images: IMAGE_URL,
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE_URL],
  },
};

export default async function UPage() {
  const supabaseAdmin = createClient(
    ENV.NEXT_PUBLIC_SUPABASE_URL,
    ENV.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data } = await supabaseAdmin.auth.admin.listUsers();

  return (
    <main>
      {Array.isArray(data.users) && (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
          {data.users.map(({ id, user_metadata }) => (
            <UserCard key={id} {...(user_metadata as UserMetadata)} />
          ))}
        </section>
      )}
    </main>
  );
}
