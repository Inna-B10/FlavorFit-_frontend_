import { useMutation } from '@apollo/client/react'
import { UserRoundPenIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { MeDocument, MeQuery, UpdateMeDocument } from '@/__generated__/graphql'
import { IAccountForm } from '../types/user.types'
import { AccountFormData } from './AccountFormData'
import { AvatarUpload } from './AvatarUpload'

export function AccountForm({ data }: { data: MeQuery }) {
  const form = useForm<IAccountForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: data.me?.firstName ?? ''
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
      className='flex flex-col gap-6 lg:gap-10'
    >
      <h1 className='text-[clamp(1.5rem,5vw,2rem)] font-semibold font-sansita text-green-dark pl-2'>
        <UserRoundPenIcon className='mr-1 inline lg:size-7 mb-1' />
        Account information
      </h1>
      <div className='flex flex-col md:flex-row gap-10'>
        <AvatarUpload avatarUrl={data.me?.avatarUrl ?? undefined} />
        <AccountFormData
          form={form}
          loading={loading}
        />
      </div>
    </form>
  )
}
