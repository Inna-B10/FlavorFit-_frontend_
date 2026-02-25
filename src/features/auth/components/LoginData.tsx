'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { USER_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { LoginDocument, MeDocument } from '@/__generated__/graphql'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function LoginData() {
  const router = useRouter()
  const [serverMessage, setServerMessage] = useState('')

  const [loginUser, { loading }] = useMutation(LoginDocument, {
    refetchQueries: [{ query: MeDocument }],
    awaitRefetchQueries: true
  })

  const onSubmit = async (form: IAuthFormInput) => {
    const result = await mutateWithToast(
      () => loginUser({ variables: { data: { email: form.email, password: form.password } } }),
      {
        successMessage: 'Successfully signed in',
        successId: 'login-success',
        errorMessage: 'Login failed',
        errorId: 'login-error'
      }
    )

    if (!result.data?.login?.user) {
      if (result.errorMessage) {
        setServerMessage(result.errorMessage)
      }
      return
    }

    router.replace(USER_PAGES.DASHBOARD)
  }

  return (
    <AuthForm
      mode='login'
      loading={loading}
      onSubmit={onSubmit}
      serverMessage={serverMessage}
    />
  )
}
