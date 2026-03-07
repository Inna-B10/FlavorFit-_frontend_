import { Weight } from 'lucide-react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ActivityIcon } from '@/shared/components/ui-custom/icons-svg/ActivityIcon'
import { HeightIcon } from '@/shared/components/ui-custom/icons-svg/HeightIcon'
import { NutritionGoalIcon } from '@/shared/components/ui-custom/icons-svg/NutritionGoalIcon'
import { RulerIcon } from '@/shared/components/ui-custom/icons-svg/RulerIcon'
import { Field, FieldError } from '@/shared/components/ui/field'
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
  form
}: {
  form: UseFormReturn<IProfileForm, unknown, IProfileForm>
}) {
  const {
    register,
    formState: { errors }
  } = form

  const nutritionGoalOptions = enumToSelectOptions(NutritionGoal)
  const activityLevelOptions = enumToSelectOptions(ActivityLevel)

  return (
    <div className='bg-white-pale space-y-4 rounded-xl border p-6'>
      <h2 className='mb-4 text-lg font-semibold'>Fitness Profile</h2>
      <div className='grid grid-cols-2 gap-4'>
        <Field className='group relative'>
          <label htmlFor='heightCm'>
            <InputGroup>
              <InputGroupInput
                id='heightCm'
                type='number'
                {...register('fitnessProfile.heightCm', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <HeightIcon />
                Height <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.fitnessProfile?.heightCm?.message}</FieldError>
          </label>
        </Field>
        <Field className='group relative'>
          <label htmlFor='currentWeight'>
            <InputGroup>
              <InputGroupInput
                id='currentWeight'
                type='number'
                {...register('fitnessProfile.currentWeight', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <Weight size={16} />
                Current weight<span className='text-xs -ml-1 -mr-2'>[kg]</span>:
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.fitnessProfile?.currentWeight?.message}</FieldError>
          </label>
        </Field>
        <Field className='group relative'>
          <label htmlFor='targetWeight'>
            <InputGroup>
              <InputGroupInput
                id='targetWeight'
                type='number'
                {...register('fitnessProfile.targetWeight', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <Weight size={16} />
                Target weight<span className='text-xs -ml-1 -mr-2'>[kg]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.fitnessProfile?.targetWeight?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='armCm'>
            <InputGroup>
              <InputGroupInput
                id='armCm'
                type='number'
                {...register('fitnessProfile.armCm', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Arm circumference<span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.fitnessProfile?.armCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='chestCm'>
            <InputGroup>
              <InputGroupInput
                id='chestCm'
                type='number'
                {...register('fitnessProfile.chestCm', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Chest circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.fitnessProfile?.chestCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='waistCm'>
            <InputGroup>
              <InputGroupInput
                id='waistCm'
                type='number'
                {...register('fitnessProfile.waistCm', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Waist circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.fitnessProfile?.waistCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='thighCm'>
            <InputGroup>
              <InputGroupInput
                id='thighCm'
                type='number'
                placeholder=''
                {...register('fitnessProfile.thighCm', {
                  setValueAs: v => {
                    if (v === '' || v === null || v === undefined) return null
                    const n = Number(v)
                    return Number.isNaN(n) ? null : n
                  }
                })}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Thigh circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.fitnessProfile?.thighCm?.message}</FieldError>
        </Field>
      </div>
      <div className='grid grid-cols-2 gap-4'>
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
          <FieldError>{errors?.fitnessProfile?.activityLevel?.message}</FieldError>
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
          <FieldError>{errors?.fitnessProfile?.nutritionGoal?.message}</FieldError>
        </Field>
      </div>
    </div>
  )
}
