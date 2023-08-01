import { createContext } from "react";
import firebase from 'firebase'
import { Provider } from "../../shared/utils/provider";

type Context = {
  session: firebase.User | null;
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
