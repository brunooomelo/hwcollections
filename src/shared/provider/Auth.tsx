import firebase from 'firebase'
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../shared/lib/firebase";
import { getProvider, Provider } from "../../shared/utils/provider";
import { AuthContext } from "../../shared/context/AuthContext";
import { useNavigate } from '@tanstack/react-location';

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const [session, setSession] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setSession(user);
        navigate({ to: '/' })
      } else {
        navigate({ to: '/login' })
      }
      setIsLoading(false)
    })
  }, []);

  async function signInWithProvider(provider: Provider) {
    const instance = getProvider(provider)
    try {
      setIsLoading(true)
      await auth.signInWithPopup(instance)
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    } finally {
      setIsLoading(false)
    }
  }


  async function signout() {
    setSession(null)
    await auth.signOut();
    navigate({ to: '/login' })

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
