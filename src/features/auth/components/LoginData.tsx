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
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [serverMessage, setServerMessage] = useState('')
  const apolloClient = useApolloClient()

  const onSubmit = async (form: IAuthFormInput) => {
    setLoading(true)
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
    await apolloClient.resetStore()
    await apolloClient.refetchQueries({ include: [MeDocument] })

    router.replace(USER_PAGES.DASHBOARD)

    setLoading(false)
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
