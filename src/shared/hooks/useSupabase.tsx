import { useMutation } from "@tanstack/react-query";
import { IItem } from "../../domains/hotwheels/@types";
// import { supabase } from "../lib/supabase";

export const useSupabase = () => {
  const bulkInsert = useMutation({
    mutationFn: async (items: Omit<IItem, 'id'>) => {
      // return supabase.from('items').insert(items).throwOnError()
    }
  })

  return {
    bulkInsert
  }
}
