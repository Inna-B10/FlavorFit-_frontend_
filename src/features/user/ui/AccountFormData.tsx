import { IdCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomField } from '@/shared/components/ui-custom/CustomField'
import { Button } from '@/shared/components/ui/button'
import { CustomLabel, Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { IAccountForm } from '../types/user.types'

export function AccountFormData({
  form,
  loading
}: {
  form: UseFormReturn<IAccountForm, unknown, IAccountForm>
  loading: boolean
}) {
  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className='w-full flex flex-col gap-4 p-4 lg:p-6 border border-input rounded-xl'>
      <h2 className='text-lg font-semibold pl-2 mb-2'>Account</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-x-4 gap-y-4'>
        <CustomField error={errors?.firstName?.message}>
          <Field
            className='group relative sm:col-span-2 md:col-span-1 2xl:col-span-2'
            orientation='horizontal'
          >
            <InputGroup>
              <InputGroupInput
                placeholder=' '
                type='text'
                {...register('firstName', {
                  setValueAs: value => (value?.trim() === '' ? null : value?.trim()),
                  validate: value => !!value || 'First name is required!'
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
          </Field>
        </CustomField>
        <CustomField
        // error={errors?.newPassword?.message}
        >
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
          </Field>
        </CustomField>
        <CustomField
        // error={errors?.confirmPassword?.message}
        >
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
          </Field>
        </CustomField>
      </div>
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 lg:mb-2'>
        <Button
          variant='outline'
          type='button'
          className='rounded-2xl w-40'
        >
          Cancel
        </Button>
        <Button
          variant='accent'
          type='submit'
          disabled={loading}
          className='rounded-2xl w-40'
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}
