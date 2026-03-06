import { Weight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
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
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { enumToSelectOptions } from '@/shared/utils/enum-to-options'
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
                {...register('heightCm')}
              />
              <InputGroupAddon align='inline-start'>
                {/* <RulerDimensionLine
                  size={16}
                  className='-rotate-90'
                /> */}
                <HeightIcon />
                Height <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.heightCm?.message}</FieldError>
          </label>
        </Field>
        <Field className='group relative'>
          <label htmlFor='currentWeight'>
            <InputGroup>
              <InputGroupInput
                id='currentWeight'
                type='number'
                {...register('currentWeight')}
              />
              <InputGroupAddon align='inline-start'>
                <Weight size={16} />
                Current weight<span className='text-xs -ml-1 -mr-2'>[kg]</span>:
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.currentWeight?.message}</FieldError>
          </label>
        </Field>
        <Field className='group relative'>
          <label htmlFor='targetWeight'>
            <InputGroup>
              <InputGroupInput
                id='targetWeight'
                type='number'
                {...register('targetWeight')}
              />
              <InputGroupAddon align='inline-start'>
                <Weight size={16} />
                Target weight<span className='text-xs -ml-1 -mr-2'>[kg]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.targetWeight?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='armCm'>
            <InputGroup>
              <InputGroupInput
                id='armCm'
                type='number'
                {...register('armCm')}
              />
              <InputGroupAddon align='inline-start'>
                {/* <Ruler size={16} /> */}
                <RulerIcon />
                Arm circumference<span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.armCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='chestCm'>
            <InputGroup>
              <InputGroupInput
                id='chestCm'
                type='number'
                placeholder=' '
                {...register('chestCm')}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Chest circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.chestCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='waistCm'>
            <InputGroup>
              <InputGroupInput
                id='waistCm'
                type='number'
                placeholder=' '
                {...register('waistCm')}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Waist circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.waistCm?.message}</FieldError>
        </Field>
        <Field className='group relative'>
          <label htmlFor='thighCm'>
            <InputGroup>
              <InputGroupInput
                id='thighCm'
                type='number'
                placeholder=''
                {...register('thighCm')}
              />
              <InputGroupAddon align='inline-start'>
                <RulerIcon />
                Thigh circumference <span className='text-xs -ml-1 -mr-2'>[cm]</span>:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.thighCm?.message}</FieldError>
        </Field>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Field>
          <label htmlFor='activityLevel'>
            <Select {...register('activityLevel')}>
              <SelectTrigger className='w-full'>
                <div className='flex items-center gap-2'>
                  <ActivityIcon />
                  <SelectValue placeholder='Set your activity level' />
                </div>
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  {enumToSelectOptions(ActivityLevel).map(item => (
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
          </label>
          <FieldError>{errors?.activityLevel?.message}</FieldError>
        </Field>
        <Field>
          <label htmlFor='nutritionGoal'>
            <Select {...register('nutritionGoal')}>
              <SelectTrigger className='w-full'>
                <div className='flex items-center gap-2'>
                  <NutritionGoalIcon />
                  <SelectValue placeholder='Select your nutrition goal' />
                </div>
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  {enumToSelectOptions(NutritionGoal).map(item => (
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
          </label>
          <FieldError>{errors?.nutritionGoal?.message}</FieldError>
        </Field>
      </div>
    </div>
  )
}
