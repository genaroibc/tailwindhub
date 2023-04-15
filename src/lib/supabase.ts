import ENV from "@/constants/env";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
