import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_URL as string,
  import.meta.env.VITE_APIKEY as string
);
