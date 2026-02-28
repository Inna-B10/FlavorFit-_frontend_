'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { NewPasswordButton } from '@/features/auth/components/NewPasswordButton'
import { isValidPassword } from '@/features/auth/utils/is-valid-check'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { Input } from '@/shared/components/ui/input'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { ValidateResetTokenDocument } from '@/__generated__/graphql'

export function ResetPasswordClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const isValidPass = isValidPassword(password)
  const showError = touched && !isValidPass

  const { data, loading, error } = useQuery(ValidateResetTokenDocument, {
    variables: { token },
    skip: !token,
    fetchPolicy: 'no-cache'
  })

  if (!token || (!data?.validateResetToken && !loading)) {
    setTimeout(() => {
      router.replace(AUTH_PAGES.REQUEST_RESET_PASSWORD)
    }, 3000)
  }

  // invalid token screen
  if (!data?.validateResetToken && !loading) {
    return (
      <div className='fixed inset-0 z-50 grid place-items-center bg-white/30 backdrop-blur-md'>
        <div className='bg-white-pale flex min-h-60 w-full max-w-sm flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-lg ring-1 ring-white/15'>
          <div className='border-muted-foreground/50 border-t-foreground mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2' />
          <p className='text-base'>Your token is invalid or expired</p>
          <p className='text-muted-foreground mt-1 text-sm'>
            You need a new request. Redirecting...
          </p>
        </div>
      </div>
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
          value={password}
          name='password'
          onChange={e => (setPassword(e.target.value), setTouched(true))}
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

      <NewPasswordButton
        token={token}
        newPassword={password}
        isValidPass={isValidPass}
      />

      <span className='text-muted-foreground text-xs'>
        You can request a new link once per minute.
      </span>
    </div>
  )
}
