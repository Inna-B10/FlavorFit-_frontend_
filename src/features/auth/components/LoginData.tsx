'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { USER_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { LoginDocument, MeDocument } from '@/__generated__/graphql'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function LoginData() {
  const router = useRouter()

  const [loginUser, { loading }] = useMutation(LoginDocument, {
    refetchQueries: [MeDocument],
    awaitRefetchQueries: true

    //     update: (cache, { data }) => {
    //       const user = data?.login?.user
    //       if (!user) return
    //
    //       cache.writeQuery({
    //         query: MeDocument,
    //         data: {
    //           me: user
    //         }
    //       })
    //     }
  })

  const onSubmit = async (form: IAuthFormInput) => {
    const result = await mutateWithToast(
      () => loginUser({ variables: { data: { email: form.email, password: form.password } } }),
      {
        loadingMessage: 'Logging in...',
        loadingId: 'login-loading',
        successMessage: 'Successfully signed in',
        successId: 'login-success',
        errorMessage: 'Login failed',
        errorId: 'login-error'
      }
    )

    if (!result.data?.login?.user) {
      return
    }

    router.replace(USER_PAGES.DASHBOARD)
  }

  //
  //     //[TODO] delete it
  //     setLoggedInFlag()
  //

  return (
    <AuthForm
      mode='login'
      loading={loading}
      onSubmit={onSubmit}
    />
  )
}
