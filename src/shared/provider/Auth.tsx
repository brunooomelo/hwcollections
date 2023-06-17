import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Provider, Session } from "@supabase/supabase-js";

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    }).finally(() => {
      setIsLoading(false)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithProvider(provider: Provider) {
    try {
      setIsLoading(true)
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider
      })

      if (error) {
        throw error
      }
      return data
    } catch (error) {
      setIsLoading(false)
    }
  }


  async function signout() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isLogged: !!session,
        isLoading,
        signInWithProvider,
        logout: signout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
