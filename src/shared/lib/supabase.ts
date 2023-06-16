import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_URL as string,
  import.meta.env.VITE_APIKEY as string
);


export const getCollectionById = (collection: string, id: string) => supabase
  .from(collection)
  .select(`
      id,
      name,
      description,
      is_active,
      is_done
    `)
  .eq('id', id)
  .throwOnError()
  .single();
