"use client";

import { Database } from "@/types/db";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { AuthSession } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export const SupabaseContext = createContext<{
  supabase: SupabaseClient<Database>;
  session: AuthSession | null;
}>();

type Props = {
  children: React.ReactNode;
};

export function SupabaseProvider({ children }: Props) {
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

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
}
