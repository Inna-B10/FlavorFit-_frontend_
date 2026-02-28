import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { Button } from '@/shared/components/ui/button'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import {
  RequestPasswordResetDocument,
  RequestVerificationEmailDocument
} from '@/__generated__/graphql'

const WAIT_SECONDS = 60

export function RequestEmailButton({
  email,
  isEmailValid,
  mode
}: {
  email: string
  isEmailValid: boolean
  mode: 'verify-email' | 'reset-password'
}) {
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const [requestVerificationEmail, verifyState] = useMutation(RequestVerificationEmailDocument)
  const [requestPasswordReset, resetState] = useMutation(RequestPasswordResetDocument)

  const loading = mode === 'verify-email' ? verifyState.loading : resetState.loading

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const onSubmit = async () => {
    if (loading || !isEmailValid || countdown > 0) return

    if (mode === 'verify-email') {
      const result = await mutateWithToast(
        () => requestVerificationEmail({ variables: { data: { email } } }),
        {
          successMessage: 'The link has been sent.\nCheck your email.',
          successId: 'request-email-success',
          errorMessage: 'Error sending email',
          errorId: 'request-email-error',
          duration: 6000
        }
      )

      if (result.data?.requestVerificationEmail) {
        setCountdown(WAIT_SECONDS)

        router.replace(AUTH_PAGES.LOGIN)
      }

      return
    }

    // mode === 'reset-password'
    const result = await mutateWithToast(
      () => requestPasswordReset({ variables: { data: { email } } }),
      {
        successMessage: 'The link has been sent.\nCheck your email.',
        successId: 'request-email-success',
        errorMessage: 'Error sending email',
        errorId: 'request-email-error',
        duration: 6000
      }
    )

    if (result.data?.requestPasswordReset) {
      setCountdown(WAIT_SECONDS)

      router.replace(AUTH_PAGES.LOGIN)
    }
  }

  return (
    <Button
      onClick={onSubmit}
      disabled={loading || countdown > 0 || !isEmailValid}
      variant='outline'
      className='bg-accent text-foreground text-md w-full max-w-2xs'
    >
      {loading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Send email'}
    </Button>
  )
}
