'use client'

import { createContext, useContext } from 'react'

export type AuthAvailabilityStatus = 'available' | 'unavailable' | 'unauthorized' | 'checking'

type AuthAvailabilityContextType = {
  status: AuthAvailabilityStatus
  setStatus: (status: AuthAvailabilityStatus) => void
}

export const AuthAvailabilityContext = createContext<AuthAvailabilityContextType | null>(null)

export function useAuthAvailability() {
  const context = useContext(AuthAvailabilityContext)

  if (!context) {
    throw new Error('useAuthAvailability must be used within AuthAvailabilityProvider')
  }

  return context
}
