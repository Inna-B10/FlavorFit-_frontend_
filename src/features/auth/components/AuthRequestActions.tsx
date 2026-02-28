'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { AuthActionButton } from '@/features/auth/ui/AuthActionButton'
import { isValidEmail } from '@/features/auth/utils/is-valid-check'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { Input } from '@/shared/components/ui/input'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import {
  RequestPasswordResetDocument,
  RequestVerificationEmailDocument
} from '@/__generated__/graphql'

type Mode = 'verify-email' | 'reset-password'

export default function AuthRequestActions({ mode }: { mode: Mode }) {
  const router = useRouter()
  const title = mode === 'verify-email' ? 'Email verification' : 'Reset Password'

  const [email, setEmail] = useState('')
  const normalizedEmail = email.trim().toLowerCase()
  const [touched, setTouched] = useState(false)
  const isEmailValid = isValidEmail(normalizedEmail)
  const showError = touched && !isEmailValid

  const [requestVerificationEmail, verifyState] = useMutation(RequestVerificationEmailDocument)
  const [requestPasswordReset, resetState] = useMutation(RequestPasswordResetDocument)

  const loading = mode === 'verify-email' ? verifyState.loading : resetState.loading

  const onSubmit = async () => {
    if (loading || !isEmailValid) return

    //# mode === 'verify-email'
    if (mode === 'verify-email') {
      const result = await mutateWithToast(
        () => requestVerificationEmail({ variables: { data: { email } } }),
        {
          successMessage: 'The link has been sent.\nCheck your email.',
          successId: 'request-email-success',
          errorMessage: 'Error sending email',
          errorId: 'request-email-error',
          duration: 6000
        }
      )

      if (result.data?.requestVerificationEmail) {
        router.replace(AUTH_PAGES.LOGIN)
      }

      return
    }

    //# mode === 'reset-password'
    const result = await mutateWithToast(
      () => requestPasswordReset({ variables: { data: { email } } }),
      {
        successMessage: 'The link has been sent.\nCheck your email.',
        successId: 'request-email-success',
        errorMessage: 'Error sending email',
        errorId: 'request-email-error',
        duration: 6000
      }
    )

    if (result.data?.requestPasswordReset) {
      router.replace(AUTH_PAGES.LOGIN)
    }
  }

  return (
    <div className='bg-white-pale relative m-auto flex min-h-60 w-full max-w-lg grow flex-col items-center justify-center gap-6 rounded-2xl px-8 py-10 shadow-md sm:px-15'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark absolute -top-4 -left-1 mb-4 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>

      <h2 className='font-sansita mb-2 text-center text-3xl font-bold italic [word-spacing:0.5rem]'>
        {title}
      </h2>

      <>
        <p>
          Please enter the email used during registration.
          <br /> If an account exists for this email, we sent link.
        </p>

        <Input
          value={email}
          name='email'
          onChange={e => (setEmail(e.target.value), setTouched(true))}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder='Enter your email'
          type='email'
          autoComplete='email'
        />
      </>
      <div className='h-9'>
        {showError && (
          <p className='text-destructive text-sm'>Please enter a valid email address.</p>
        )}
      </div>

      <AuthActionButton
        isValid={isEmailValid}
        loading={loading}
        onSubmit={onSubmit}
        buttonText='Send request'
        loadingText='Sending...'
      />
    </div>
  )
}
