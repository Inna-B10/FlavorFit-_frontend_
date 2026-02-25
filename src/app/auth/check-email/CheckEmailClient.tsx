'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ResendVerificationButton } from '@/features/auth/ui/ResendVerificationButton'
import { isValidEmail } from '@/features/auth/utils/isValidEmail'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { Input } from '@/shared/components/ui/input'

export default function CheckEmail() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [localEmail, setLocalEmail] = useState(email)
  const [touched, setTouched] = useState(false)

  const normalizedEmail = localEmail.trim().toLowerCase()
  const isEmailValid = isValidEmail(normalizedEmail)
  const showError = touched && !isEmailValid

  return (
    <div className='bg-white-pale m-auto flex min-h-60 w-full max-w-md grow flex-col items-center justify-center gap-6 rounded-2xl p-10 shadow-md'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark mb-4 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>

      <h2 className='font-sansita mb-2 text-center text-3xl font-bold italic'>
        Email verification
      </h2>

      {email ? (
        <>
          <p className='text-muted-foreground mt-3 text-sm'>
            Verification link was sent to{' '}
            <span className='text-foreground font-medium text-nowrap'>{email}</span>. Open it to
            finish signing up.
          </p>

          <p className='text-muted-foreground mt-2 text-sm'>
            Don&apos;t see it? Check Spam or Promotions.
          </p>
        </>
      ) : (
        <>
          <p className='w-full text-pretty'>
            Please enter the email used during registration and we&apos;ll send a new verification
            link.
          </p>

          <Input
            value={localEmail}
            name='email'
            onChange={e => (setLocalEmail(e.target.value), setTouched(true))}
            placeholder='Enter your email'
            type='email'
            autoComplete='email'
          />
        </>
      )}

      {showError && <p className='text-destructive text-sm'>Please enter a valid email address.</p>}

      <ResendVerificationButton
        email={localEmail}
        isEmailValid={isEmailValid}
      />

      <span className='text-muted-foreground text-xs'>
        You can request a new link once per minute.
      </span>
    </div>
  )
}
