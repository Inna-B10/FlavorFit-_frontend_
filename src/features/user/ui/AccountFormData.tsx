import { IdCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Field, FieldError } from '@/shared/components/ui/field'
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
    <div className='rounded-xl border p-6 flex gap-4 w-full'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-lg font-semibold pl-2'>Account</h2>
        <div className='space-y-8'>
          <Field>
            <label htmlFor='firstName'>
              <InputGroup className='h-10'>
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
          <AvatarUpload
            value={form.watch('avatarUrl') || undefined}
            onChange={url => form.setValue('avatarUrl', url)}
          />
        </div>
      </div>
    </div>
  )
}
