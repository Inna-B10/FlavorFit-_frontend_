import Image from 'next/image'
import { Controller, UseFormReturn } from 'react-hook-form'
import { IoScaleOutline } from 'react-icons/io5'
import { optionalNumberValidation } from '@/features/auth/utils/is-valid-check'
import { CustomFieldNumber } from '@/shared/components/ui-custom/CustomFieldNumber'
import { ActivityIcon } from '@/shared/components/ui-custom/icons-svg/ActivityIcon'
import { HeightIcon } from '@/shared/components/ui-custom/icons-svg/HeightIcon'
import { NutritionGoalIcon } from '@/shared/components/ui-custom/icons-svg/NutritionGoalIcon'
import { RulerIcon } from '@/shared/components/ui-custom/icons-svg/RulerIcon'
import { Field } from '@/shared/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from '@/shared/components/ui/select'
import { enumToSelectOptions, enumValueToLabel } from '@/shared/utils/enum-to-options'
import { cn } from '@/shared/utils/utils'
import { ActivityLevel, NutritionGoal } from '@/__generated__/graphql'
import { IProfileForm } from '../types/user.types'

export function FitnessProfileForm({
  form,
  updatedAt
}: {
  form: UseFormReturn<IProfileForm, unknown, IProfileForm>
  updatedAt?: string
}) {
  const {
    register,
    formState: { errors }
  } = form

  const gender = form.watch('userProfile.gender')
  const nutritionGoalOptions = enumToSelectOptions(NutritionGoal)
  const activityLevelOptions = enumToSelectOptions(ActivityLevel)

  return (
    <div className='rounded-xl border p-4 pb-10 lg:p-6 lg:pb-10 lg:pl-0 flex gap-6 lg:w-[60%] md:w-1/2 w-full'>
      <div className='flex gap-6 w-full items-start'>
        <Image
          src={gender === 'MALE' ? '/bg-images/male.svg' : '/bg-images/female.svg'}
          alt='auth-background'
          width={200}
          height={600}
          className={cn('hidden lg:block', gender === 'FEMALE' ? 'pl-5' : 'pl-2')}
        />
        <div className='flex flex-col gap-4 w-full'>
          <h2 className='text-lg font-semibold'>Fitness Profile</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-x-4 2xl:gap-x-6 gap-y-4'>
            {updatedAt && (
              <span className='text-sm lg:text-end'>
                Last updated at: <br />
                {updatedAt}
              </span>
            )}
            <CustomFieldNumber
              label='Height'
              htmlFor='heightCm'
              icon={<HeightIcon />}
              registration={register(
                'fitnessProfile.heightCm',
                optionalNumberValidation({ min: 100, max: 250, label: 'Height' })
              )}
              error={errors?.fitnessProfile?.heightCm?.message}
            />
            <CustomFieldNumber
              label='Current weight'
              htmlFor='currentWeight'
              icon={<IoScaleOutline size={16} />}
              isWeight={true}
              registration={register(
                'fitnessProfile.currentWeight',
                optionalNumberValidation({
                  min: 30,
                  max: 300,
                  integer: false,
                  label: 'Current weight'
                })
              )}
              error={errors?.fitnessProfile?.currentWeight?.message}
            />
            <CustomFieldNumber
              label='Target weight'
              htmlFor='targetWeight'
              icon={<IoScaleOutline size={16} />}
              isWeight={true}
              registration={register(
                'fitnessProfile.targetWeight',
                optionalNumberValidation({
                  min: 30,
                  max: 300,
                  integer: false,
                  label: 'Target weight'
                })
              )}
              error={errors?.fitnessProfile?.targetWeight?.message}
            />
            <CustomFieldNumber
              label='Arm'
              htmlFor='armCm'
              icon={<RulerIcon />}
              registration={register(
                'fitnessProfile.armCm',
                optionalNumberValidation({ min: 1, label: 'Arm circumference' })
              )}
              error={errors?.fitnessProfile?.armCm?.message}
            />
            <CustomFieldNumber
              label='Chest'
              htmlFor='chestCm'
              icon={<RulerIcon />}
              registration={register(
                'fitnessProfile.chestCm',
                optionalNumberValidation({ min: 1, label: 'Chest circumference' })
              )}
              error={errors?.fitnessProfile?.chestCm?.message}
            />
            <CustomFieldNumber
              label='Waist'
              htmlFor='waistCm'
              icon={<RulerIcon />}
              registration={register(
                'fitnessProfile.waistCm',
                optionalNumberValidation({ min: 1, label: 'Waist circumference' })
              )}
              error={errors?.fitnessProfile?.waistCm?.message}
            />
            <CustomFieldNumber
              label='Thigh'
              htmlFor='thighCm'
              icon={<RulerIcon />}
              registration={register(
                'fitnessProfile.thighCm',
                optionalNumberValidation({ min: 1, label: 'Thigh circumference' })
              )}
              error={errors?.fitnessProfile?.thighCm?.message}
            />
          </div>
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-4 2xl:gap-x-6'>
            <Field>
              <Controller
                control={form.control}
                name='fitnessProfile.activityLevel'
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='w-full'>
                      <div className='flex items-center gap-2'>
                        <ActivityIcon />
                        {field.value
                          ? enumValueToLabel(ActivityLevel, field.value)
                          : 'Select your activity level'}
                      </div>
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      <SelectGroup>
                        {activityLevelOptions.map(item => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <Controller
                control={form.control}
                name='fitnessProfile.nutritionGoal'
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='w-full'>
                      <div className='flex items-center gap-2'>
                        <NutritionGoalIcon />
                        {field.value
                          ? enumValueToLabel(NutritionGoal, field.value)
                          : 'Select your nutrition goal'}
                      </div>
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      <SelectGroup>
                        {nutritionGoalOptions.map(item => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}
