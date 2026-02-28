import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { authService } from '@/features/auth/services/client.services/auth.service'
import { AUTH_PAGES } from '@/shared/config/pages.config'
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
      await authService.logout()
      await apolloClient.clearStore()
      router.refresh()
      router.replace(AUTH_PAGES.LOGIN)
    } finally {
      // Always clear local state, even if network fails
      await apolloClient.clearStore()
      router.refresh()
      router.replace(AUTH_PAGES.LOGIN)
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
