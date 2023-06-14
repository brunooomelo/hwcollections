import { Avatar, Button, Flex, Group, Text } from "@mantine/core";
import { GithubLogo } from "@phosphor-icons/react";
import { supabase } from "../../../shared/lib/supabase";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Navigate } from "@tanstack/react-location";

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
      <button
        className="max-w-[300px] flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
        onClick={signInWithGitHub}
      >
        <GithubLogo className="h-5 w-5 rounded-full" />
        <span className="text-sm font-semibold leading-6">Login with GitHub</span>
      </button>
    </div >

  );
}

export default Login;
