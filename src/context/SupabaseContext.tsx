"use client";

import { Database } from "@/types/db";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { createContext, useState } from "react";

export const SupabaseContext = createContext<{
  supabase: SupabaseClient<Database>;
}>();

type Props = {
  children: React.ReactNode;
};

export function SupabaseProvider({ children }: Props) {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}
