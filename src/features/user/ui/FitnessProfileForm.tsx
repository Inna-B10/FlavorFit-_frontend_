import { Ruler } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field'
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
        <Field>
          <FieldLabel htmlFor='heightCm'>Height</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='heightCm'
              type='number'
              placeholder='Height'
              {...register('heightCm')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.heightCm?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='current weight'>Current weight</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='currentWeight'
              type='number'
              placeholder='Current weight'
              {...register('currentWeight')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.currentWeight?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='target weight'>Target weight</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='targetWeight'
              type='number'
              placeholder='Target weight'
              {...register('targetWeight')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.targetWeight?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor='armCm'>Arm circumference</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='armCm'
              type='number'
              placeholder='Arm circumference'
              {...register('armCm')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.armCm?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='chestCm'>Chest circumference</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='chestCm'
              type='number'
              placeholder='Chest circumference'
              {...register('chestCm')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.chestCm?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='waistCm'>Waist circumference</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='waistCm'
              type='number'
              placeholder='Waist circumference'
              {...register('thighCm')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.thighCm?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='thighCm'>Thigh circumference</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='thighCm'
              type='number'
              placeholder='Thigh circumference'
              {...register('waistCm')}
            />
            <InputGroupAddon align='inline-start'>
              <Ruler size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.waistCm?.message}</FieldError>
        </Field>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Field>
          <FieldLabel htmlFor='activity level'>Activity level</FieldLabel>
          <Select {...register('activityLevel')}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select your activity level' />
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
        </Field>
        <Field>
          <FieldLabel htmlFor='nutrition goal'>Set your nutrition goal</FieldLabel>
          <Select {...register('nutritionGoal')}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select your nutrition goal' />
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
        </Field>
      </div>
    </div>
  )
}
