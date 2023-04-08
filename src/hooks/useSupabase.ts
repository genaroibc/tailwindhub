import { useState } from "react";
import { Database } from "@/types/db";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";

type Client = {
  supabase: SupabaseClient<Database>;
};

export function useSupabase(): Client {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

  return { supabase };
}
