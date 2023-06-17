import { Provider, Session } from "@supabase/supabase-js";
import { createContext } from "react";

type Context = {
  session: Session | null;
  isLogged: boolean;
  isLoading: boolean
  signInWithProvider: (provider: Provider) => void
  logout: () => void
};

export const AuthContext = createContext<Context>({
  session: null,
  isLogged: false,
  isLoading: true,
  signInWithProvider: () => { },
  logout: () => { }
});
