import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { MeDocument, MeQuery, UpdateMeDocument } from '@/__generated__/graphql'
import { IAccountForm } from '../types/user.types'
import { AccountFormData } from './AccountFormData'

export function AccountForm({ data }: { data: MeQuery }) {
  const form = useForm<IAccountForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: data.me?.firstName ?? ''
    }
  })

  const [updateUser, { loading }] = useMutation(UpdateMeDocument, {
    update(cache, { data }) {
      const updatedUser = data?.updateUser
      if (!updatedUser) return

      cache.writeQuery({
        query: MeDocument,
        data: {
          me: data?.updateUser
        }
      })
    }
  })

  const submit = form.handleSubmit(async data => {
    await mutateWithToast(
      () =>
        updateUser({
          variables: {
            data
          }
        }),
      {
        successMessage: 'Account successfully updated',
        successId: 'account-update-success',
        errorMessage: 'Account update failed',
        errorId: 'account-update-error'
      }
    )
  })

  return (
    <form
      onSubmit={submit}
      name='update-profile'
      className='w-full flex flex-col gap-8 p-4 lg:p-6 border border-input rounded-xl'
    >
      <AccountFormData
        form={form}
        loading={loading}
      />
    </form>
  )
}
