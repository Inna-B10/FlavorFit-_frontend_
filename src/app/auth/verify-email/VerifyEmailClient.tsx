'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { authService } from '@/features/auth/services/client.services/auth.service'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { AUTH_PAGES, PUBLIC_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { MeDocument } from '@/__generated__/graphql'

export function VerifyEmail() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const token = useSearchParams().get('token')
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (!token) {
      router.replace(AUTH_PAGES.REQUEST_VERIFICATION_EMAIL)
      return
    }

    let alive = true
    const run = async () => {
      setLoading(true)

      const result = await mutateWithToast(() => authService.verifyEmail(token), {
        successMessage: 'Email successfully verified!',
        successId: 'verify-email-success',
        errorId: 'verify-email-error'
      })

      const user = result.data?.verifyEmail?.user

      if (!alive) return

      if (user) {
        await apolloClient.refetchQueries({ include: [MeDocument] })

        if (!alive) return

        router.replace(PUBLIC_PAGES.HOME)
        return
      }

      if (alive) setLoading(false)
    }
    run()
    return () => {
      alive = false
    }
  }, [token, router, apolloClient])

  if (loading)
    return (
      <div className='fixed inset-0 z-50 grid place-items-center bg-white/30 backdrop-blur-md'>
        <div className='bg-white-pale w-[90%] max-w-sm rounded-2xl p-6 text-center shadow-lg ring-1 ring-white/15'>
          <div className='border-muted-foreground/50 border-t-foreground mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2' />
          <p className='text-base'>Verifying your email…</p>
          <p className='text-muted-foreground mt-1 text-sm'>This usually takes a moment.</p>
        </div>
      </div>
    )

  return (
    <div className='bg-white-pale relative m-auto flex min-h-60 w-full max-w-md grow flex-col items-center justify-center gap-4 rounded-2xl px-8 py-10 shadow-md sm:px-15'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark absolute -top-4 -left-1 mb-4 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>
      <h2 className='font-sansita my-4 text-center text-3xl font-bold italic [word-spacing:0.5rem]'>
        Email verification
      </h2>
      <p className='text-muted-foreground mt-3 text-sm'>
        This link is invalid, expired or already used.
      </p>
      <div className='text-muted-foreground mt-3 flex w-full flex-col gap-2 text-center text-sm sm:flex-row'>
        <div>
          Try to &nbsp;&nbsp;
          <Link
            href={AUTH_PAGES.LOGIN}
            title='Sign in'
            aria-label='Sign in'
            className='text-foreground font-medium underline'
          >
            Sign in
          </Link>{' '}
        </div>
        <div>
          or&nbsp;&nbsp;
          <Link
            href={AUTH_PAGES.REQUEST_VERIFICATION_EMAIL}
            title='Resend email'
            aria-label='Resend email'
            className='text-foreground font-medium underline'
          >
            get new verification email
          </Link>
        </div>
      </div>
    </div>
  )
}
