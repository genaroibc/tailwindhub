import { useEffect, useState } from "react";
import { Database } from "@/types/db";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { AuthSession } from "@supabase/supabase-js";

type Client = {
  supabase: SupabaseClient<Database>;
  session: AuthSession | null;
};

export function useSupabase(): Client {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { supabase, session };
}
