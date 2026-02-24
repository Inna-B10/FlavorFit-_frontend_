import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { logoutRequest } from '@/features/auth/services/logout.service'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { cn } from '@/shared/utils/utils'

export function LogoutButton({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const apolloClient = useApolloClient()
  const router = useRouter()

  const onLogout = async () => {
    try {
      await logoutRequest(apolloClient)
      router.push(PUBLIC_PAGES.HOME)
      router.refresh()
    } catch (e) {
      //logout should be resilient; even if mutation fails, clear local state.
      await apolloClient.clearStore()
      router.push(PUBLIC_PAGES.HOME)
      router.refresh()
    }
  }

  return (
    <button
      onClick={onLogout}
      title='Logout'
      className={cn('flex items-center gap-2', className)}
    >
      {children}
    </button>
  )
}
