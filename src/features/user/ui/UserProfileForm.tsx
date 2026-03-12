import { BookUser, CalendarFold, IdCard, VenusAndMars } from 'lucide-react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { optionalNumberValidation } from '@/features/auth/utils/is-valid-check'
import { CustomField } from '@/shared/components/ui-custom/CustomField'
import { DressIcon } from '@/shared/components/ui-custom/icons-svg/DressIcon'
import { SuitIcon } from '@/shared/components/ui-custom/icons-svg/SuitIcon'
import { CustomLabel, Field } from '@/shared/components/ui/field'
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
  SelectTrigger
} from '@/shared/components/ui/select'
import { enumToSelectOptions, enumValueToLabel } from '@/shared/utils/enum-to-options'
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

  const genderOptions = enumToSelectOptions(Gender)

  return (
    <div className='space-y-8 rounded-xl border p-4 lg:p-6 lg:w-[40%] md:w-1/2 w-full'>
      <h2 className='text-lg font-semibold'>General information</h2>
      <div className='space-y-4'>
        <CustomField error={errors?.userProfile?.fullName?.message}>
          <Field
            className='group relative'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                placeholder=' '
                type='text'
                {...register('userProfile.fullName', {
                  setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                })}
              />
              <InputGroupAddon align='inline-start'>
                <IdCard size={16} />
              </InputGroupAddon>
            </InputGroup>
            <CustomLabel
              htmlFor='fullName'
              className='floating-label'
            >
              Full Name:
            </CustomLabel>
          </Field>
        </CustomField>

        <div className='grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 sm:mb-4 md:grid-cols-1 md:mb-10'>
          <CustomField error={errors?.userProfile?.birthYear?.message}>
            <Field
              className='group relative'
              orientation='horizontal'
            >
              <InputGroup>
                <InputGroupInput
                  placeholder=' '
                  type='number'
                  {...register(
                    'userProfile.birthYear',
                    optionalNumberValidation({ min: 1900, max: 2023, label: 'Birth year' })
                  )}
                />
                <InputGroupAddon align='inline-start'>
                  <CalendarFold size={16} />
                </InputGroupAddon>
              </InputGroup>
              <CustomLabel
                htmlFor='birthYear'
                className='floating-label'
              >
                Birth Year:
              </CustomLabel>
            </Field>
          </CustomField>
          <Field>
            <Controller
              control={form.control}
              name='userProfile.gender'
              render={({ field }) => (
                <Select
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='w-full'>
                    <div className='flex items-center gap-2'>
                      {field.value ? (
                        <>
                          {field.value.toLocaleLowerCase() === 'male' ? (
                            <SuitIcon className='text-muted-foreground' />
                          ) : (
                            <DressIcon className='text-muted-foreground' />
                          )}
                          {enumValueToLabel(Gender, field.value)}
                        </>
                      ) : (
                        <>
                          <VenusAndMars
                            size={16}
                            className={cn(field.value !== null && 'hidden')}
                          />
                          <span className='text-muted-foreground'>Gender</span>
                        </>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectGroup>
                      {genderOptions.map(item => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                        >
                          <div className='flex items-center gap-2'>
                            {item.label?.toLocaleLowerCase() === 'male' ? (
                              <SuitIcon className='text-foreground' />
                            ) : (
                              <DressIcon className='text-foreground' />
                            )}
                            {item.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
        <Field>
          <label htmlFor='bio'>
            <InputGroup>
              <InputGroupTextarea
                id='bio'
                rows={10}
                className='min-h-52'
                {...register('userProfile.bio', {
                  setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                })}
              />
              <InputGroupAddon align='block-start'>
                <BookUser size={16} />
                About me:
              </InputGroupAddon>
            </InputGroup>
          </label>
        </Field>
      </div>
    </div>
  )
}
