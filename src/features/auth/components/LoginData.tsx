'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import toast from 'react-hot-toast'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import { USER_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { MeDocument } from '@/__generated__/graphql'
import { authService } from '../services/client.services/auth.service'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function LoginData() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [serverMessage, setServerMessage] = useState('')
  const apolloClient = useApolloClient()

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const ref = useRef<TurnstileInstance | null>(null)

  const onSubmit = async (form: IAuthFormInput) => {
    if (!captchaToken) {
      toast.error('Please complete reCAPTCHA', { id: 'captcha-error' })
      return
    }
    setLoading(true)

    const result = await mutateWithToast(
      () => authService.login(form.email, form.password, captchaToken),
      {
        successMessage: 'Successfully signed in',
        successId: 'login-success',
        errorMessage: 'Login failed',
        errorId: 'login-error'
      }
    )

    const user = result.data?.login?.user

    setLoading(false)

    if (!user) {
      if (result.errorMessage) {
        setServerMessage(result.errorMessage)
      }
      ref.current?.reset()
      return
    }

    // Refresh Apollo state after cookies are set:
    await apolloClient.resetStore()
    await apolloClient.refetchQueries({ include: [MeDocument] })

    router.replace(USER_PAGES.DASHBOARD)
  }

  return (
    <div className='bg-white-pale relative m-auto flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl p-6 shadow-md'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark absolute -top-4 -left-1 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>
      <AuthForm
        mode='login'
        loading={loading}
        onSubmit={onSubmit}
        serverMessage={serverMessage}
        setCaptchaToken={setCaptchaToken}
        ref={ref}
      />
    </div>
  )
}
