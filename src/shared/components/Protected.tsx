import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-location";
import { useAuth } from "../hooks/useAuth";

type ProtectedProps = {
  children: ReactNode;
  path?: string
};

export const Protected = ({ children, path = '/login' }: ProtectedProps) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to={path} />;
  }

  return <>{children}</>;
};
