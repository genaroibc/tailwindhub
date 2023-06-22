import ENV from "@/constants/env";
import { Database } from "@/types/db";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
