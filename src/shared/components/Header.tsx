import { Avatar, Text } from "@mantine/core"
import { useAuth } from "../hooks/useAuth"
import { supabase } from "../lib/supabase";
import { Button } from "./Button";


async function signout() {
  const { error } = await supabase.auth.signOut();
}

export const Header = () => {
  const { session } = useAuth()
  return (
    <div className="flex flex-col xs:flex-row items-center gap-4">
      <span>HWishList</span>
      <div className="flex w-full gap-3 flex-1 justify-end">
        <div className="flex items-center gap-4">
          <Avatar
            src={session?.user.user_metadata?.avatar_url}
            alt={session?.user.user_metadata?.full_name}
            radius="xl"
            size={40}
          />
          <Text weight={500} size="sm" sx={{ lineHeight: 2 }} mr={3}>
            {session?.user.user_metadata?.full_name}
          </Text>
        </div>
        <Button
          className="max-w-[80px]"
          onClick={signout}
        >
          <span className="text-sm font-semibold leading-6">Logout</span>
        </Button>
      </div>
    </div>
  )
}
