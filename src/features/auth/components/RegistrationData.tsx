'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { UserModel } from '@/__generated__/graphql'
import { authService } from '../services/client.services/auth.service'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function RegistrationData() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserModel>()
  const [serverMessage, setServerMessage] = useState('')

  const onSubmit = async (form: IAuthFormInput) => {
    setLoading(true)
    const result = await mutateWithToast(
      () => authService.registration(form.email, form.password, form.firstName!),
      {
        loadingMessage: 'Processing...',
        loadingId: 'register-loading',
        successMessage: 'Account created.',
        successId: 'register-success',
        errorMessage: 'Registration failed',
        errorId: 'register-error'
      }
    )

    setUser(result.data?.register?.user)

    setLoading(false)

    if (!user) {
      if (result.errorMessage) {
        setServerMessage(result.errorMessage)
      }
      return
    }
  }

  return (
    <div className='bg-white-pale relative m-auto flex w-full max-w-lg flex-col items-center justify-center gap-6 rounded-2xl p-6 shadow-md'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark absolute -top-5 -left-2 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>
      {user ? (
        <>
          <h2 className='font-sansita my-4 text-center text-3xl font-bold italic [word-spacing:0.5rem]'>
            Email verification
          </h2>
          <div className='flex w-full grow-2 flex-col items-center justify-around gap-4 sm:p-2 sm:text-center'>
            <p>A verification link has been sent to</p>
            <p className='text-chart-2 text-center font-medium text-nowrap'>{user.email}</p>
            <p>Open the email and click the link to finish signing up.</p>
            <p className='text-chart-2'>
              You won&apos;t be able to log in until your email is verified.
            </p>

            <p className='text-muted-foreground text-sm'>
              Didn&apos;t receive the email? Check your Spam or Promotions folder.
            </p>

            <p className='text-muted-foreground my-4 text-xs'>
              Need a new verification link?{' '}
              <Link
                href={AUTH_PAGES.REQUEST_VERIFICATION_EMAIL}
                className='underline-offset-2'
              >
                Click here!
              </Link>
            </p>
          </div>
        </>
      ) : (
        <AuthForm
          mode='register'
          loading={loading}
          onSubmit={onSubmit}
          serverMessage={serverMessage}
        />
      )}
    </div>
  )
}
