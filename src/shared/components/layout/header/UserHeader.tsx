'use client'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthAvailability } from '@/shared/components/auth/AuthAvailabilityContext'
import { Header } from './Header'

export function UserHeader() {
  const { user, isLoggedIn } = useAuth()
  const { status } = useAuthAvailability()

  const isAuthorized = status !== 'unauthorized'

  return (
    <Header
      user={isAuthorized ? user : null}
      isLoggedIn={isAuthorized && isLoggedIn}
    />
  )
}
