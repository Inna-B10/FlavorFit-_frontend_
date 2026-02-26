'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { authService } from '../services/client.services/auth.service'
import { IAuthFormInput } from '../types/auth-form.types'
import { AuthForm } from '../ui/AuthForm'

export function RegistrationData() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [serverMessage, setServerMessage] = useState('')

  const onSubmit = async (form: IAuthFormInput) => {
    setLoading(true)
    const result = await mutateWithToast(
      () => authService.registration(form.email, form.password, form.firstName!),
      {
        loadingMessage: 'Processing...',
        loadingId: 'register-loading',
        successMessage: 'Account created. Verify your email.',
        successId: 'register-success',
        errorMessage: 'Registration failed',
        errorId: 'register-error'
      }
    )

    const user = result.data?.register?.user

    if (!user) {
      if (result.errorMessage) {
        setServerMessage(result.errorMessage)
      }
      return
    }

    router.replace(`/auth/check-email?email=${encodeURIComponent(form.email)}`)

    setLoading(false)
  }

  return (
    <AuthForm
      mode='register'
      loading={loading}
      onSubmit={onSubmit}
      serverMessage={serverMessage}
    />
  )
}
