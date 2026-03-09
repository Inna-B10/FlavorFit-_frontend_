import { IdCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomLabel, Field, FieldError } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { IAccountForm } from '../types/user.types'
import { AvatarUpload } from './AvatarUpload'

export function AccountFormData({
  form
}: {
  form: UseFormReturn<IAccountForm, unknown, IAccountForm>
}) {
  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-4 md:gap-8'>
        <h2 className='text-lg font-semibold pl-2'>Account</h2>
        <div className='space-y-8'>
          <AvatarUpload
            value={form.watch('avatarUrl') || undefined}
            onChange={url => form.setValue('avatarUrl', url)}
          />
          <Field>
            <label htmlFor='firstName'>
              <InputGroup>
                <InputGroupInput
                  id='firstName'
                  type='text'
                  {...register('firstName', {
                    setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                  })}
                />
                <InputGroupAddon align='inline-start'>
                  <IdCard size={16} />
                  First Name:
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors?.firstName?.message}</FieldError>
            </label>
          </Field>
          <Field>
            <label htmlFor='firstName'>
              <InputGroup>
                <InputGroupInput
                  id='firstName'
                  type='text'
                  {...register('firstName', {
                    setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                  })}
                />
                <InputGroupAddon align='inline-start'>
                  <IdCard size={16} />
                  New Password:
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors?.firstName?.message}</FieldError>
            </label>
          </Field>
          <Field
            className='group relative'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                placeholder=' '
                {...register('firstName')}
              />
              <InputGroupAddon align='inline-start'>
                <IdCard size={16} />
              </InputGroupAddon>
            </InputGroup>
            <CustomLabel
              htmlFor='confirmPassword'
              className='floating-label'
            >
              Confirm Password:
            </CustomLabel>
            <FieldError>{errors?.firstName?.message}</FieldError>
          </Field>
        </div>
      </div>
    </div>
  )
}
