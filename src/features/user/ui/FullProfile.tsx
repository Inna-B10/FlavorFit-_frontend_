'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/ui/button'
import { mutateWithToast } from '@/shared/lib/mutate-with-toast'
import { GetFullProfileDocument, UpdateFullProfileDocument } from '@/__generated__/graphql'
import { IProfileForm } from '../types/user.types'
import { FitnessProfileForm } from './FitnessProfileForm'
import { UserProfileForm } from './UserProfileForm'

//[TODO]

export function FullProfile() {
  const form = useForm<IProfileForm>({
    mode: 'onChange'
  })

  const { data } = useQuery(GetFullProfileDocument)

  const [updateProfile, { loading }] = useMutation(UpdateFullProfileDocument)

  const submit = form.handleSubmit(async data => {
    await mutateWithToast(
      () =>
        updateProfile({
          variables: {
            data: {
              fitnessProfile: {
                activityLevel: data.activityLevel,
                nutritionGoal: data.nutritionGoal,
                currentWeight: data.currentWeight,
                targetWeight: data.targetWeight,
                armCm: data.armCm,
                chestCm: data.chestCm,
                heightCm: data.heightCm,
                thighCm: data.thighCm,
                waistCm: data.waistCm
              },
              userProfile: {
                fullName: data.fullName,
                gender: data.gender,
                birthYear: data.birthYear,
                bio: data.bio
              }
            }
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
          type='button'
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
