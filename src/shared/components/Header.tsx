import { Avatar, Text } from "@mantine/core"
import { useAuth } from "../hooks/useAuth"
// import { supabase } from "../lib/supabase";
import { Button } from "./Button";


export const Header = () => {
  const { session, logout } = useAuth()
  return (
    <div className="flex flex-col xs:flex-row items-center gap-4">
      <span>HWishList</span>
      <div className="flex w-full gap-3 flex-1 justify-end">
        <div className="flex items-center gap-4">
          <Avatar
            src={session?.photoURL}
            alt={session?.displayName || ''}
            radius="xl"
            size={40}
          />
          <Text weight={500} size="sm" sx={{ lineHeight: 2 }} mr={3}>
            {session?.displayName}
          </Text>
        </div>
        <Button
          className="max-w-[80px]"
          onClick={logout}
        >
          <span className="text-sm font-semibold leading-6">Logout</span>
        </Button>
      </div>
    </div>
  )
}
