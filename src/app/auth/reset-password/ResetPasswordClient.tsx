'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'
import { AuthActionButton } from '@/features/auth/ui/AuthActionButton'
import { isValidPassword } from '@/features/auth/utils/is-valid-check'
import { Overlay } from '@/shared/components/ui-custom/Overlay'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { Input } from '@/shared/components/ui/input'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'

export function ResetPasswordClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const isValidPass = isValidPassword(newPassword)
  const showError = touched && !isValidPass

  const { tokenStatus, resetPassword, mutateLoading } = useResetPassword(token)

  // redirect if invalid/missing
  useEffect(() => {
    if (tokenStatus === 'missing' || tokenStatus === 'invalid') {
      const t = setTimeout(() => {
        router.replace(AUTH_PAGES.REQUEST_RESET_PASSWORD)
      }, 8000)

      return () => clearTimeout(t)
    }
  }, [tokenStatus, router])

  // mutation handler
  const onSubmit = async () => {
    if (mutateLoading || !isValidPass || tokenStatus !== 'valid') return

    const result = await mutateWithToast(() => resetPassword(newPassword), {
      successMessage: 'Your password has been reset.',
      successId: 'reset-password-success',
      errorId: 'reset-password-error'
    })

    if (result.data?.resetPassword) {
      router.replace(AUTH_PAGES.LOGIN)
    }
  }

  //** ----------------------------- Render ----------------------------- */
  if (tokenStatus === 'checking') {
    return (
      <Overlay>
        <p className='text-muted-foreground'>Validating token…</p>
      </Overlay>
    )
  }

  if (tokenStatus === 'missing' || tokenStatus === 'invalid') {
    return (
      <Overlay>
        <p className='text-base'>Your token is invalid or expired</p>
        <p className='text-muted-foreground mt-1 text-sm'>You need a new request. Redirecting...</p>
      </Overlay>
    )
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
        Set New Password
      </h2>

      <>
        <Input
          value={newPassword}
          name='password'
          onChange={e => (setNewPassword(e.target.value), setTouched(true))}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder='Enter your new password'
          type='text'
        />
        <p className='w-[95%] text-sm'>
          Please note that your new password must meet the following requirements:
        </p>
        <ul className='text-muted-foreground list-disc px-6 text-sm'>
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one lowercase letter</li>
          <li>Contains at least one digit</li>
          {/* <li>Contains at least one special character</li> */}
        </ul>
      </>
      <div className='h-4'>
        {showError && <p className='text-destructive text-xs'>Invalid password format</p>}
      </div>

      <AuthActionButton
        isValid={isValidPass}
        loading={mutateLoading}
        onSubmit={onSubmit}
        buttonText='Reset'
        loadingText='Sending...'
      />
    </div>
  )
}
