import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

type Context = {
  session: Session | null;
  isLogged: boolean;
};

export const AuthContext = createContext<Context>({
  session: null,
  isLogged: false,
});
