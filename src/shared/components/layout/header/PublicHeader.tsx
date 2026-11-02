'use client'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { Header } from './Header'

export function PublicHeader() {
  const { user, isLoggedIn } = useAuth()

  return (
    <Header
      user={user}
      isLoggedIn={isLoggedIn}
    />
  )
}
