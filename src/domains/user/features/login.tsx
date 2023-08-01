import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Navigate } from "@tanstack/react-location";
import { Button } from "../../../shared/components/Button";


export function Login() {
  const { isLogged, isLoading, signInWithProvider } = useAuth();

  if (!isLoading && isLogged) {
    return <Navigate to='/' />
  }

  return !isLogged ? (
    <div className="flex flex-col gap-4 h-full justify-center items-center container mx-auto">
      <Button className="max-w-[300px]"
        onClick={() => signInWithProvider('google')}
        disabled={isLoading}
      >
        <GoogleLogo className="h-5 w-5 rounded-full" />
        <span className="text-sm font-semibold leading-6"> {isLoading ? 'Loading' : 'Login with Google'}</span>
      </Button>
      <Button className="max-w-[300px]"
        onClick={() => signInWithProvider('github')}
        disabled={isLoading}
      >
        <GithubLogo className="h-5 w-5 rounded-full" />
        <span className="text-sm font-semibold leading-6"> {isLoading ? 'Loading' : 'Login with GitHub'}</span>
      </Button>
    </div>

  ) : null
}
