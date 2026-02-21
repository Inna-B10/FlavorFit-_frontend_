import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Button } from '@/shared/components/ui/button'
import {
  ResendVerificationDocument,
  ResendVerificationMutation,
  ResendVerificationMutationVariables
} from '@/__generated__/graphql'

export function ResendVerificationButton({
  email,
  isEmailValid
}: {
  email: string
  isEmailValid: boolean
}) {
  const [countdown, setCountdown] = useState(0)

  const [resendVerification, { loading }] = useMutation<
    ResendVerificationMutation,
    ResendVerificationMutationVariables
  >(ResendVerificationDocument)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleResend = async () => {
    try {
      await resendVerification({ variables: { email } })

      const { toast } = await import('react-hot-toast')
      toast.success('The verification link has been sent.\nCheck your email.', { duration: 6000 })
      setCountdown(60)
    } catch (error) {
      console.error(error)

      const { toast } = await import('react-hot-toast')
      toast.error('Error sending email.')
    }
  }

  return (
    <Button
      onClick={handleResend}
      disabled={loading || countdown > 0 || !isEmailValid}
      variant='outline'
      className='mt-2 text-sm'
    >
      {loading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Send a new link'}
    </Button>
  )
}
