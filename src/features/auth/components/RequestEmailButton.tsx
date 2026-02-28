import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Button } from '@/shared/components/ui/button'
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

  const [sendEmail, { loading }] = useMutation(
    mode === 'verify-email' ? RequestVerificationEmailDocument : RequestPasswordResetDocument
  )

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  const onSubmit = async () => {
    if (loading || !isEmailValid || countdown > 0) return

    const result = await mutateWithToast(() => sendEmail({ variables: { data: { email } } }), {
      successMessage: 'The link has been sent.\nCheck your email.',
      successId: 'request-email-success',
      errorMessage: 'Error sending email',
      errorId: 'request-email-error',
      duration: 6000
    })

    if (result?.data) {
      const resultData =
        'requestPasswordReset' in result.data
          ? result.data.requestPasswordReset
          : result.data.requestVerificationEmail

      if (resultData) {
        setCountdown(WAIT_SECONDS)
      }
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
