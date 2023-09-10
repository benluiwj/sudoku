import { createClient } from "@supabase/supabase-js";

// Use a custom domain as the supabase URL
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLIC_ANON_KEY!
);
