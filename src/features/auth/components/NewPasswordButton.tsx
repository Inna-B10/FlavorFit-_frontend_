import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { ResetPasswordDocument } from '@/__generated__/graphql'

const WAIT_SECONDS = 60

export function NewPasswordButton({
  newPassword,
  isValidPass,
  token
}: {
  newPassword: string
  isValidPass: boolean
  token: string
}) {
  const [countdown, setCountdown] = useState(0)

  const [newPasswordMutation, { loading }] = useMutation(ResetPasswordDocument)

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  const onSubmit = async () => {
    if (loading || !isValidPass || countdown > 0) return

    const result = await mutateWithToast(
      () =>
        newPasswordMutation({
          variables: { data: { newPassword, token } }
        }),
      {
        successMessage: 'Your password has been reset.',
        successId: 'reset-password-success',
        errorId: 'reset-password-error'
      }
    )

    if (result.data?.resetPassword) {
      setCountdown(WAIT_SECONDS)
    }
  }

  return (
    <Button
      onClick={onSubmit}
      disabled={loading || countdown > 0 || !isValidPass}
      variant='outline'
      className='bg-accent text-foreground text-md w-full max-w-2xs'
    >
      {loading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Reset'}
    </Button>
  )
}
