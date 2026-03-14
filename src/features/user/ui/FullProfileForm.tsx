import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { ImProfile } from 'react-icons/im'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
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

  const isTouched = Object.keys(form.formState.touchedFields).length > 0
  const isValid = form.formState.isValid

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
        loadingMessage: 'Updating profile...',
        loadingId: 'profile-update-loading',
        errorMessage: 'Error updating profile',
        errorId: 'profile-update-error'
      }
    )
  })

  return (
    <form
      onSubmit={submit}
      name='update-profile'
      className='flex flex-col gap-6 lg:gap-10'
    >
      <div className='flex justify-between items-center gap-4 p-2 pb-0'>
        <h1 className='text-[clamp(1.5rem,5vw,2rem)] font-semibold font-sansita text-green-dark'>
          <ImProfile className='inline lg:size-7 mb-1' /> Personal information
        </h1>
        <div className='hidden lg:flex justify-end gap-4'>
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
            disabled={loading || form.formState.isSubmitting || !isTouched || !isValid}
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-10 md:flex-row w-full'>
        <UserProfileForm form={form} />
        <FitnessProfileForm
          form={form}
          updatedAt={formatDate(updatedAt)}
        />
      </div>
      <div className='lg:hidden flex justify-center gap-4 my-4'>
        <Button
          variant='outline'
          type='button'
          className='w-36'
        >
          Cancel
        </Button>
        <Button
          variant='accent'
          type='submit'
          disabled={loading || form.formState.isSubmitting || !isTouched || !isValid}
          className='w-36'
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}
