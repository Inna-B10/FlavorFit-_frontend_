import Image from 'next/image'
import { Weight } from 'lucide-react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { optionalNumberValidation } from '@/features/auth/utils/is-valid-check'
import { CustomField } from '@/shared/components/ui-custom/CustomField'
import { ActivityIcon } from '@/shared/components/ui-custom/icons-svg/ActivityIcon'
import { HeightIcon } from '@/shared/components/ui-custom/icons-svg/HeightIcon'
import { NutritionGoalIcon } from '@/shared/components/ui-custom/icons-svg/NutritionGoalIcon'
import { RulerIcon } from '@/shared/components/ui-custom/icons-svg/RulerIcon'
import { CustomLabel, Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from '@/shared/components/ui/select'
import { enumToSelectOptions, enumValueToLabel } from '@/shared/utils/enum-to-options'
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
    <div className='rounded-xl border p-4 pb-8 lg:p-6 lg:pb-8 lg:pl-0 flex flex-col gap-6 lg:w-[70%] md:w-1/2 w-full'>
      <h2 className='text-lg font-semibold pl-1 lg:pl-6'>Fitness Profile</h2>
      <div className='flex gap-2'>
        <Image
          src={gender === 'MALE' ? '/bg-images/male.svg' : '/bg-images/female.svg'}
          alt='auth-background'
          width={200}
          height={600}
          className='hidden lg:block'
        />
        <div className='flex flex-col gap-4 w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-x-4 2xl:gap-x-6 gap-y-4'>
            {updatedAt && (
              <span className='text-sm lg:text-end'>
                Last updated at: <br />
                {updatedAt}
              </span>
            )}
            <CustomField error={errors?.fitnessProfile?.heightCm?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    {...register(
                      'fitnessProfile.heightCm',
                      optionalNumberValidation({ min: 100, max: 250, label: 'Height' })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <HeightIcon />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='heightCm'
                  className='floating-label'
                >
                  Height <span className='text-xs'>[cm]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.currentWeight?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    step='0.1'
                    {...register(
                      'fitnessProfile.currentWeight',
                      optionalNumberValidation({
                        min: 30,
                        max: 300,
                        integer: false,
                        label: 'Current weight'
                      })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <Weight size={16} />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='currentWeight'
                  className='floating-label'
                >
                  Current weight <span className='text-xs'>[kg]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.targetWeight?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    step='0.1'
                    {...register(
                      'fitnessProfile.targetWeight',
                      optionalNumberValidation({
                        min: 30,
                        max: 300,
                        integer: false,
                        label: 'Target weight'
                      })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <Weight size={16} />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='targetWeight'
                  className='floating-label'
                >
                  Target weight <span className='text-xs'>[kg]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.armCm?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    {...register(
                      'fitnessProfile.armCm',
                      optionalNumberValidation({ min: 1, label: 'Arm circumference' })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <RulerIcon />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='armCm'
                  className='floating-label'
                >
                  Arm <span className='text-xs'>[cm]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.chestCm?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    {...register(
                      'fitnessProfile.chestCm',
                      optionalNumberValidation({ min: 1, label: 'Chest circumference' })
                    )}
                  />
                  <InputGroupAddon
                    align='inline-start'
                    className='text-xs whitespace-nowrap'
                  >
                    <RulerIcon />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='chestCm'
                  className='floating-label'
                >
                  Chest <span className='text-xs'>[cm]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.waistCm?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    {...register(
                      'fitnessProfile.waistCm',
                      optionalNumberValidation({ min: 1, label: 'Waist circumference' })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <RulerIcon />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='waistCm'
                  className='floating-label'
                >
                  Waist <span className='text-xs'>[cm]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
            <CustomField error={errors?.fitnessProfile?.thighCm?.message}>
              <Field
                className='group relative'
                orientation='horizontal'
              >
                <InputGroup>
                  <InputGroupInput
                    placeholder=' '
                    type='number'
                    {...register(
                      'fitnessProfile.thighCm',
                      optionalNumberValidation({ min: 1, label: 'Thigh circumference' })
                    )}
                  />
                  <InputGroupAddon align='inline-start'>
                    <RulerIcon />
                  </InputGroupAddon>
                </InputGroup>
                <CustomLabel
                  htmlFor='thighCm'
                  className='floating-label'
                >
                  Thigh <span className='text-xs'>[cm]</span>:
                </CustomLabel>
              </Field>
            </CustomField>
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
