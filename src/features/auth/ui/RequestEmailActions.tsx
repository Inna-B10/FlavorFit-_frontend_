'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RequestEmailButton } from '@/features/auth/components/RequestEmailButton'
import { isValidEmail } from '@/features/auth/utils/is-valid-check'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { Input } from '@/shared/components/ui/input'

type Mode = 'verify-email' | 'reset-password'

export default function RequestEmailActions({ mode }: { mode: Mode }) {
  const title = mode === 'verify-email' ? 'Email verification' : 'Reset Password'
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const normalizedEmail = email.trim().toLowerCase()
  const isEmailValid = isValidEmail(normalizedEmail)
  const showError = touched && !isEmailValid

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

      <RequestEmailButton
        email={email}
        isEmailValid={isEmailValid}
        mode={mode}
      />

      <span className='text-muted-foreground text-xs'>
        You can request a new link once per minute.
      </span>
    </div>
  )
}
