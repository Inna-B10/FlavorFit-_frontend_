import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { GetFullProfileQuery, UpdateFullProfileDocument } from '@/__generated__/graphql'
import { IProfileForm } from '../types/user.types'
import { FitnessProfileForm } from './FitnessProfileForm'
import { UserProfileForm } from './UserProfileForm'

export function FullProfileForm({ data }: { data: GetFullProfileQuery }) {
  const { userProfile, fitnessProfile: fitnessProfileData } = data.fullProfile
  const { updatedAt, ...fitnessProfile } = fitnessProfileData

  const form = useForm<IProfileForm>({
    mode: 'onChange',
    defaultValues: {
      userProfile: userProfile ?? {},
      fitnessProfile: fitnessProfile ?? {}
      // userProfile: {
      //   fullName: data?.fullProfile?.userProfile?.fullName ?? undefined,
      //   birthYear: data?.fullProfile?.userProfile?.birthYear ?? undefined,
      //   gender: data?.fullProfile?.userProfile?.gender ?? undefined,
      //   bio: data?.fullProfile?.userProfile?.bio ?? undefined
      // },
      // fitnessProfile: {
      //   heightCm: data?.fullProfile?.fitnessProfile?.heightCm ?? undefined,
      //   currentWeight: data?.fullProfile?.fitnessProfile?.currentWeight ?? undefined,
      //   targetWeight: data?.fullProfile?.fitnessProfile?.targetWeight ?? undefined,
      //   armCm: data?.fullProfile?.fitnessProfile?.armCm ?? undefined,
      //   chestCm: data?.fullProfile?.fitnessProfile?.chestCm ?? undefined,
      //   waistCm: data?.fullProfile?.fitnessProfile?.waistCm ?? undefined,
      //   thighCm: data?.fullProfile?.fitnessProfile?.thighCm ?? undefined,
      //   activityLevel: data?.fullProfile?.fitnessProfile?.activityLevel ?? undefined,
      //   nutritionGoal: data?.fullProfile?.fitnessProfile?.nutritionGoal ?? undefined
      // }
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
      className='space-y-6'
    >
      <div className='flex justify-end gap-3'>
        <Button
          variant='outline'
          type='button'
        >
          Cancel
        </Button>
        <Button
          variant='default'
          type='submit'
          disabled={loading}
        >
          Save changes
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <UserProfileForm form={form} />
        <FitnessProfileForm form={form} />
      </div>
    </form>
  )
}
