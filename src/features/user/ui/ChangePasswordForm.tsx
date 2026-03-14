import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { authService } from '@/features/auth/services/client.services/auth.service'
import { Overlay } from '@/shared/components/ui-custom/Overlay'
import { AUTH_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { ChangePasswordDocument } from '@/__generated__/graphql'
import { IChangePasswordForm } from '../types/user.types'
import { ChangePasswordFormData } from './ChangePasswordFormData'

export function ChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false)
  const router = useRouter()

  const form = useForm<IChangePasswordForm>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const [changePassword, { loading }] = useMutation(ChangePasswordDocument)

  const submit = form.handleSubmit(async data => {
    const { confirmPassword, ...rest } = data
    const result = await mutateWithToast(
      () =>
        changePassword({
          variables: {
            data: rest
          }
        }),
      {
        successMessage: 'Password successfully changed',
        successId: 'password-change-success',
        errorMessage: 'Password change failed',
        errorId: 'password-change-error'
      }
    )

    if (result?.data?.changePassword) {
      setShowLogoutOverlay(true)

      setTimeout(async () => {
        await authService.logout()
        router.replace(AUTH_PAGES.LOGIN)
      }, 5000)
    }
    if (result?.errorMessage) {
      setServerError(result?.errorMessage)
    }
    form.reset()
  })

  return (
    <>
      <form
        onSubmit={submit}
        name='change-password-form'
        className='w-full flex gap-4 p-4 lg:p-6 border border-input rounded-xl grow items-start'
      >
        <ChangePasswordFormData
          form={form}
          loading={loading}
          serverError={serverError}
          setServerError={setServerError}
        />
      </form>
      {showLogoutOverlay && (
        <Overlay>
          <p className='text-center text-sm'>
            For security reasons you need to login again.
            <br />
            Redirecting ...
          </p>
        </Overlay>
      )}
    </>
  )
}
