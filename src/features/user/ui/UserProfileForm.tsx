import { CalendarFold, IdCard, Mars, Venus, VenusAndMars } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea
} from '@/shared/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { enumToSelectOptions } from '@/shared/utils/enum-to-options'
import { Gender } from '@/__generated__/graphql'
import { IProfileForm } from '../types/user.types'

export function UserProfileForm({
  form
}: {
  form: UseFormReturn<IProfileForm, unknown, IProfileForm>
}) {
  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className='bg-white-pale h-full rounded-xl p-6'>
      <h2 className='mb-4 text-lg font-semibold'>General information</h2>
      <div className='space-y-4'>
        <Field>
          <FieldLabel htmlFor='full name'>Full Name</FieldLabel>
          <InputGroup>
            <InputGroupInput
              placeholder='Full name'
              {...register('fullName')}
            />
            <InputGroupAddon align='inline-start'>
              <IdCard size={16} />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{errors?.fullName?.message}</FieldError>
        </Field>

        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <FieldLabel htmlFor='birth year'>Birth Year</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder='Birth Year'
                {...register('birthYear')}
              />
              <InputGroupAddon align='inline-start'>
                <CalendarFold size={16} />
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.birthYear?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor='gender'>Gender</FieldLabel>
            <Select {...register('gender')}>
              <SelectTrigger className='w-[180px]'>
                <div className='flex items-center gap-2'>
                  <VenusAndMars size={16} />
                  <SelectValue placeholder='Gender' />
                </div>
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  {enumToSelectOptions(Gender).map(item => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label === 'MALE' ? (
                        <Mars
                          size={16}
                          className='text-foreground'
                        />
                      ) : (
                        <Venus
                          size={16}
                          className='text-foreground'
                        />
                      )}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{errors?.gender?.message}</FieldError>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor='bio'>Bio</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              placeholder='Write about yourself'
              className='h-full'
              {...register('bio')}
            />
            {/* <InputGroupAddon align='block-start'>
              <CalendarFold size={16} />
            </InputGroupAddon> */}
          </InputGroup>
          <FieldError>{errors?.birthYear?.message}</FieldError>
        </Field>
      </div>
    </div>
  )
}
