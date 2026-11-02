'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { useAuthAvailability } from './AuthAvailabilityContext'

export function AuthAvailabilityGate({ children }: PropsWithChildren<unknown>) {
  const { status } = useAuthAvailability()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthorized') {
      router.replace(AUTH_PAGES.LOGIN)
    }
  }, [status, router])

  if (status === 'checking') {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-center'>Checking your session...</p>
      </div>
    )
  }

  if (status === 'unavailable') {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-center'>
          Server is temporarily unavailable. <br />
          Please try again later.
        </p>
      </div>
    )
  }

  if (status === 'unauthorized') return null

  return children
}
