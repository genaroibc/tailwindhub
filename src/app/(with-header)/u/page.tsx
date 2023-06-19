import { UserMetadata } from "@/types/user";
import { createClient } from "@supabase/supabase-js";
import { UserCard } from "./components/UserCard";
import ENV from "@/constants/env";

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
