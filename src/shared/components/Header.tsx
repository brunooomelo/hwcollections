import { Avatar, Text } from "@mantine/core"
import { useAuth } from "../hooks/useAuth"
import { supabase } from "../lib/supabase";


async function signout() {
  const { error } = await supabase.auth.signOut();
}

export const Header = () => {
  const { session } = useAuth()
  return (
    <div className='flex justify-between'>
      <span>Headers</span>
      <div className="flex gap-3">
        <div className="flex items-center gap-4 w-full">
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

        <button
          className="max-w-[300px] flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
          onClick={signout}>
          <span className="text-sm font-semibold leading-6">Logout</span>
        </button>
      </div>
    </div>
  )
}
