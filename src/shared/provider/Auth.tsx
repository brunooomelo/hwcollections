import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLogged: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
