'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApolloClient, useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import { LogoIcon } from '@/shared/components/ui/logo/LogoIcon'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import {
  VerifyEmailDocument,
  VerifyEmailMutation,
  VerifyEmailMutationVariables
} from '@/__generated__/graphql'

export function VerifyEmail() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const token = useSearchParams().get('token')
  const apolloClient = useApolloClient()

  const [verifyEmail] = useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
    VerifyEmailDocument
  )

  useEffect(() => {
    if (!token) {
      router.replace('/auth/check-email')
      return
    }

    const run = async () => {
      setLoading(true)
      try {
        const res = await verifyEmail({ variables: { token } })

        if (res.data?.verifyEmail?.accessToken) {
          toast.success('Email successfully verified!')
          router.replace(PUBLIC_PAGES.HOME)

          await apolloClient.resetStore()

          return
        }

        toast.error('Verification failed.')
      } catch (error) {
        toast.error('Invalid or expired verification link.')
      }

      setLoading(false)
    }

    run()
  }, [token, verifyEmail, router, apolloClient])

  if (loading)
    return (
      <div className='fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm'>
        <div className='w-full max-w-sm rounded-2xl bg-white/10 p-6 text-center shadow-lg ring-1 ring-white/15'>
          <div className='mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white' />
          <p className='text-base text-white'>Verifying your email…</p>
          <p className='mt-1 text-sm text-white/70'>This usually takes a moment.</p>
        </div>
      </div>
    )

  return (
    <div className='bg-white-pale m-auto flex min-h-60 w-full max-w-md grow flex-col items-center justify-center gap-4 rounded-2xl p-10 shadow-md'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark mb-4 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>
      <h2 className='font-sansita my-4 text-center text-3xl font-bold italic'>
        Email verification
      </h2>
      <p className='text-muted-foreground mt-3 text-sm'>This link is invalid or already used</p>
      <div className='text-muted-foreground mt-3 flex gap-2 text-center text-sm'>
        Try to{' '}
        <Link
          href={PUBLIC_PAGES.LOGIN}
          title='Sign in'
          aria-label='Sign in'
          className='text-foreground font-medium underline'
        >
          Sign in
        </Link>
        or
        <Link
          href='/auth/check-email'
          title='Resend email'
          aria-label='Resend email'
          className='text-foreground font-medium underline'
        >
          Resend verification link
        </Link>
      </div>
    </div>
  )
}
