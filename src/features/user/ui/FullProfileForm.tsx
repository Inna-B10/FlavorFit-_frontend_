import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { ImProfile } from 'react-icons/im'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { formatDate } from '@/shared/utils/date-format'
import { GetFullProfileQuery, UpdateFullProfileDocument } from '@/__generated__/graphql'
import { IProfileForm } from '../types/user.types'
import { FitnessProfileForm } from './FitnessProfileForm'
import { UserProfileForm } from './UserProfileForm'

export function FullProfileForm({ data }: { data: GetFullProfileQuery }) {
  const { userProfile, fitnessProfile: fitnessProfileData } = data.fullProfile

  const updatedAt = fitnessProfileData?.updatedAt ?? null

  const fitnessProfile = fitnessProfileData
    ? (({ updatedAt, ...rest }) => rest)(fitnessProfileData)
    : undefined

  const form = useForm<IProfileForm>({
    mode: 'onChange',
    defaultValues: {
      userProfile: userProfile ?? {},
      fitnessProfile: fitnessProfile ?? {}
    }
  })

  const [updateProfile, { loading }] = useMutation(UpdateFullProfileDocument)

  const submit = form.handleSubmit(async data => {
    await mutateWithToast(
      () =>
        updateProfile({
          variables: {
            data
          }
        }),
      {
        successMessage: 'Profile successfully updated',
        successId: 'profile-update-success',
        errorMessage: 'Error updating profile',
        errorId: 'profile-update-error'
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
          <ImProfile className='mr-2 inline' /> Personal information
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
        <UserProfileForm form={form} />
        <FitnessProfileForm
          form={form}
          updatedAt={formatDate(updatedAt)}
        />
      </div>
    </form>
  )
}
