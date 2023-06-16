import { GithubLogo } from "@phosphor-icons/react";
import { supabase } from "../../../shared/lib/supabase";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Navigate } from "@tanstack/react-location";
import { Button } from "../../../shared/components/Button";

async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}

async function signout() {
  const { error } = await supabase.auth.signOut();
}

function Login() {
  const { isLogged, session } = useAuth();

  if (isLogged) {
    return <Navigate to='/' />
  }

  return (
    <div className="flex h-full justify-center items-center container mx-auto">
      <Button className="max-w-[300px]"
        onClick={signInWithGitHub}
      >
        <GithubLogo className="h-5 w-5 rounded-full" />
        <span className="text-sm font-semibold leading-6">Login with GitHub</span>
      </Button>

    </div >

  );
}

export default Login;
