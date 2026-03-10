import { IdCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomLabel, Field, FieldError } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { IAccountForm } from '../types/user.types'
import { AvatarUpload } from './AvatarUpload'

export function AccountFormData({
  form,
  avatarUrl
}: {
  form: UseFormReturn<IAccountForm, unknown, IAccountForm>
  avatarUrl?: string
}) {
  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-4 md:gap-8'>
        <h2 className='text-lg font-semibold pl-2'>Account</h2>
        <div className='space-y-8 pb-2'>
          <AvatarUpload avatarUrl={avatarUrl ?? undefined} />
          <Field
            className='group relative'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                placeholder=' '
                type='text'
                {...register('firstName', {
                  setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                })}
              />
              <InputGroupAddon align='inline-start'>
                <IdCard size={16} />
              </InputGroupAddon>
            </InputGroup>
            <CustomLabel
              htmlFor='firstName'
              className='floating-label'
            >
              First Name:
            </CustomLabel>
            <FieldError>{errors?.firstName?.message}</FieldError>
          </Field>
          <Field
            className='group relative'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                type='text'
                placeholder=' '
                // {...register('newPassword', {
                //   setValueAs: value => (value?.trim() === '' ? null : value?.trim())
                // })}
              />
              <InputGroupAddon align='inline-start'>
                <IdCard size={16} />
              </InputGroupAddon>
            </InputGroup>
            <CustomLabel
              htmlFor='newPassword'
              className='floating-label'
            >
              New Password:
            </CustomLabel>
            {/* <FieldError>{errors?.newPassword?.message}</FieldError> */}
          </Field>
          <Field
            className='group relative'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                placeholder=' '
                // {...register('confirmPassword', {
                //   validate: value => value === form.getValues('newPassword') || 'Passwords don`t match!'
                // })}
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
            {/* <FieldError>{errors?.confirmPassword?.message}</FieldError> */}
          </Field>
        </div>
      </div>
    </div>
  )
}
