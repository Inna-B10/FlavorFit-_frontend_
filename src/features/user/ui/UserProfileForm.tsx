import { useState } from 'react'
import { BookUser, CalendarFold, IdCard, VenusAndMars } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { DressIcon } from '@/shared/components/ui-custom/icons-svg/DressIcon'
import { SuitIcon } from '@/shared/components/ui-custom/icons-svg/SuitIcon'
import { Field, FieldError } from '@/shared/components/ui/field'
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
import { cn } from '@/shared/utils/utils'
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

  const [gender, setGender] = useState<Gender>()

  console.log(gender)
  return (
    <div className='bg-white-pale h-full rounded-xl p-6'>
      <h2 className='mb-4 text-lg font-semibold'>General information</h2>
      <div className='space-y-4'>
        <Field className='group relative'>
          <label htmlFor='fullName'>
            <InputGroup>
              <InputGroupInput
                id='fullName'
                type='text'
                {...register('fullName')}
              />
              <InputGroupAddon align='inline-start'>
                <IdCard size={16} />
                Full Name:
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors?.fullName?.message}</FieldError>
          </label>
        </Field>

        <div className='grid grid-cols-2 gap-4'>
          <Field className='group relative'>
            <label htmlFor='birthYear'>
              <InputGroup>
                <InputGroupInput
                  id='birthYear'
                  type='number'
                  {...register('birthYear')}
                />
                <InputGroupAddon align='inline-start'>
                  <CalendarFold size={16} />
                  Birth Year:
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors?.birthYear?.message}</FieldError>
            </label>
          </Field>
          <Field className='group relative'>
            <label htmlFor='gender'>
              <Select
                {...register('gender')}
                onValueChange={value => setGender(value as Gender)}
              >
                <SelectTrigger className='w-full'>
                  <div className='flex items-center gap-2'>
                    <VenusAndMars
                      size={16}
                      className={cn(gender !== undefined && 'hidden')}
                    />
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
                        <div className='flex items-center gap-2'>
                          {item.label === 'MALE' ? (
                            <SuitIcon
                              className={cn(
                                'text-foreground',
                                gender === 'FEMALE' ? 'text-foreground' : 'text-muted-foreground'
                              )}
                            />
                          ) : (
                            <DressIcon
                              className={cn(
                                'text-foreground',
                                gender === 'MALE' ? 'text-foreground' : 'text-muted-foreground'
                              )}
                            />
                          )}
                          {item.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{errors?.gender?.message}</FieldError>
            </label>
          </Field>
        </div>
        <Field className='group relative'>
          <label htmlFor='bio'>
            <InputGroup>
              <InputGroupTextarea
                id='bio'
                placeholder=' '
                {...register('bio')}
              />
              <InputGroupAddon align='block-start'>
                <BookUser size={16} />
                About me:
              </InputGroupAddon>
            </InputGroup>
          </label>
          <FieldError>{errors?.bio?.message}</FieldError>
        </Field>
      </div>
    </div>
  )
}
