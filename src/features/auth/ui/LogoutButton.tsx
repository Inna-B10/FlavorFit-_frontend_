import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { Button } from '@/shared/components/ui/button'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { logout } from '../services/logout.service'

export function LogoutButton() {
  const apolloClient = useApolloClient()
  const router = useRouter()

  const onLogout = async () => {
    try {
      await logout(apolloClient)
      router.replace(PUBLIC_PAGES.HOME)
    } catch (e) {
      //logout should be resilient; even if mutation fails, clear local state.
      await apolloClient.clearStore()
      router.replace(PUBLIC_PAGES.HOME)
    }
  }

  return (
    <Button
      onClick={onLogout}
      title='Logout'
      className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light h-full rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
    >
      <LiaSignOutAltSolid className='size-[16] md:size-[18] xl:size-[22]' />
    </Button>
  )
}
