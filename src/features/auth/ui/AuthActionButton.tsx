import { Button } from '@/shared/components/ui/button'

type ActionButtonProps = {
  isValid: boolean
  loading: boolean
  onSubmit: () => void
  buttonText: string
  loadingText?: string
}

export function AuthActionButton({
  isValid,
  loading,
  onSubmit,
  buttonText,
  loadingText = 'Processing...'
}: ActionButtonProps) {
  return (
    <Button
      onClick={onSubmit}
      disabled={loading || !isValid}
      variant='outline'
      className='bg-accent text-foreground text-md w-full max-w-2xs'
    >
      {loading ? loadingText : buttonText}
    </Button>
  )
}
