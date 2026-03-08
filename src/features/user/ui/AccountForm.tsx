import { useMutation } from '@apollo/client/react'
import { UserRoundPenIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { MeDocument, MeQuery, UpdateMeDocument } from '@/__generated__/graphql'
import { IAccountForm } from '../types/user.types'
import { AccountFormData } from './AccountFormData'

export function AccountForm({ data }: { data: MeQuery }) {
  const form = useForm<IAccountForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: data.me?.firstName ?? '',
      avatarUrl: data.me?.avatarUrl ?? ''
      // password: '',
      // confirmPassword: ''
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
    const result = await mutateWithToast(
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
      className='flex flex-col gap-10'
    >
      <div className='flex justify-between items-center gap-4 px-4'>
        <h2 className='text-3xl font-semibold font-sansita text-green-dark'>
          <UserRoundPenIcon className='mr-2 inline lg:size-7 mb-1' /> Account information
        </h2>
        <div className='flex justify-end gap-3'>
          <Button
            variant='outline'
            type='button'
            className='min-w-36'
          >
            Cancel
          </Button>
          <Button
            variant='accent'
            type='submit'
            disabled={loading}
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-8 md:flex-row'>
        <AccountFormData form={form} />
      </div>
    </form>
  )
}
