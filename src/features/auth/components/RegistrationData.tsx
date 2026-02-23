'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { RegisterDocument } from '@/__generated__/graphql'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function RegistrationData() {
  const router = useRouter()

  const [registerUser, { loading }] = useMutation(RegisterDocument)

  const onSubmit = async (form: IAuthFormInput) => {
    const result = await mutateWithToast(
      () =>
        registerUser({
          variables: {
            data: { email: form.email, password: form.password, firstName: form.firstName! }
          }
        }),
      {
        loadingMessage: 'Creating account...',
        loadingId: 'register-loading',
        successMessage: 'Successfully registered',
        successId: 'register-success',
        errorMessage: 'Registration failed',
        errorId: 'register-error'
      }
    )

    if (!result.data?.register?.user) return

    router.replace(`/auth/check-email?email=${encodeURIComponent(form.email)}`)

    // //[TODO] delete it
    // setLoggedInFlag()
  }

  return (
    <AuthForm
      mode='register'
      loading={loading}
      onSubmit={onSubmit}
    />
  )
}
