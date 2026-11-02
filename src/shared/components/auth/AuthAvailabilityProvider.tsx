'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AuthAvailabilityContext, AuthAvailabilityStatus } from './AuthAvailabilityContext'

type AuthAvailabilityProviderProps = PropsWithChildren<{
  initialStatus: AuthAvailabilityStatus
}>

export function AuthAvailabilityProvider({
  children,
  initialStatus
}: AuthAvailabilityProviderProps) {
  const [status, setStatus] = useState<AuthAvailabilityStatus>(initialStatus)
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return

    previousPathname.current = pathname

    const controller = new AbortController()

    async function checkAuthStatus() {
      setStatus('checking')

      try {
        const response = await fetch('/api/auth/status', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal
        })

        const data: { status?: AuthAvailabilityStatus } = await response.json()

        if (
          data.status === 'available' ||
          data.status === 'unavailable' ||
          data.status === 'unauthorized'
        ) {
          setStatus(data.status)
        } else {
          setStatus('unavailable')
        }
      } catch {
        if (!controller.signal.aborted) {
          setStatus('unavailable')
        }
      }
    }

    void checkAuthStatus()

    return () => controller.abort()
  }, [pathname])

  return (
    <AuthAvailabilityContext.Provider value={{ status, setStatus }}>
      {children}
    </AuthAvailabilityContext.Provider>
  )
}
