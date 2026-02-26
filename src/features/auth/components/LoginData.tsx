'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'
import { USER_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { MeDocument } from '@/__generated__/graphql'
import { authService } from '../services/client.services/auth.service'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function LoginData() {
  const router = useRouter()
  const [serverMessage, setServerMessage] = useState('')
  const apolloClient = useApolloClient()

  // const [loginUser, { loading }] = useMutation(LoginDocument, {
  //   refetchQueries: [{ query: MeDocument }],
  //   awaitRefetchQueries: true
  // })

  const onSubmit = async (form: IAuthFormInput) => {
    const result = await mutateWithToast(() => authService.login(form.email, form.password), {
      successMessage: 'Successfully signed in',
      successId: 'login-success',
      errorMessage: 'Login failed',
      errorId: 'login-error'
    })

    const user = result.data?.login?.user

    if (!user) {
      if (result.errorMessage) {
        setServerMessage(result.errorMessage)
      }
      return
    }

    // Refresh Apollo state after cookies are set:
    apolloClient.cache.writeQuery({ query: MeDocument, data: { me: user } })

    router.replace(USER_PAGES.DASHBOARD)
  }

  return (
    <AuthForm
      mode='login'
      loading={false}
      onSubmit={onSubmit}
      serverMessage={serverMessage}
    />
  )
}
