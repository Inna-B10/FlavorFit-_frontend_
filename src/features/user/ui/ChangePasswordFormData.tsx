import { useEffect } from 'react'
import Image from 'next/image'
import { IdCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomField } from '@/shared/components/ui-custom/CustomField'
import { Button } from '@/shared/components/ui/button'
import { CustomLabel, Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { IChangePasswordForm } from '../types/user.types'

export function ChangePasswordFormData({
  form,
  loading,
  serverError,
  setServerError
}: {
  form: UseFormReturn<IChangePasswordForm, unknown, IChangePasswordForm>
  loading: boolean
  serverError?: string | null
  setServerError: (error: string | null) => void
}) {
  const {
    register,
    formState: { errors, isValid }
  } = form

  const currentPassword = form.watch('currentPassword')
  const newPassword = form.watch('newPassword')

  useEffect(() => {
    if (form.getFieldState('newPassword').isTouched) {
      void form.trigger('newPassword')
    }
  }, [currentPassword, form])

  useEffect(() => {
    if (form.getFieldState('confirmPassword').isTouched) {
      void form.trigger('confirmPassword')
    }

    if (form.getFieldState('newPassword').isTouched) {
      void form.trigger('newPassword')
    }
  }, [newPassword, form])

  return (
    <>
      <Image
        src={'/bg-images/fitness.svg'}
        alt='auth-background'
        width={200}
        height={600}
        className={'hidden lg:block'}
      />
      <div className='flex flex-col gap-10 w-full'>
        <div className='w-full flex justify-between items-center gap-4'>
          <h2 className='text-lg font-semibold pl-2'>Password</h2>
          <Button
            variant='accent'
            type='submit'
            size='xs'
            disabled={loading || !isValid}
            className='rounded-2xl px-4'
          >
            Save
          </Button>
        </div>
        <p className='pl-2 col-span-2'>After successful password change, you will be logged out</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-x-6 gap-y-4 place-content-center'>
          <CustomField error={errors?.currentPassword?.message}>
            <Field
              className='group relative'
              orientation='horizontal'
            >
              <InputGroup>
                <InputGroupInput
                  type='password'
                  placeholder=' '
                  {...register('currentPassword', {
                    onChange: () => setServerError(null),
                    required: 'Current password is required',
                    setValueAs: value => (value?.trim() === '' ? null : value?.trim()),
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <InputGroupAddon align='inline-start'>
                  <IdCard size={16} />
                </InputGroupAddon>
              </InputGroup>
              <CustomLabel
                htmlFor='currentPassword'
                className='floating-label'
              >
                Current Password:
              </CustomLabel>
            </Field>
          </CustomField>
          <CustomField error={errors?.newPassword?.message}>
            <Field
              className='group relative'
              orientation='horizontal'
            >
              <InputGroup>
                <InputGroupInput
                  type='password'
                  placeholder=' '
                  {...register('newPassword', {
                    required: 'New password is required',
                    setValueAs: value => (value?.trim() === '' ? null : value?.trim()),
                    // validate: value => isValidPassword(value) ||
                    // 'Password must be at least 8 characters, one lowercase, one uppercase, one digit and at least one special character !@#$%^&*',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    },
                    validate: {
                      notSameAsCurrent: value =>
                        value !== form.getValues('currentPassword') ||
                        'New password is the same as the old one!',
                      matchesConfirm: value =>
                        !form.getValues('confirmPassword') ||
                        value === form.getValues('confirmPassword') ||
                        'Passwords don`t match!'
                    }
                  })}
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
          <CustomField error={errors?.confirmPassword?.message}>
            <Field
              className='group relative'
              orientation='horizontal'
            >
              <InputGroup>
                <InputGroupInput
                  type='password'
                  placeholder=' '
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: value =>
                      value === form.getValues('newPassword') || 'Passwords don`t match!'
                  })}
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
        {serverError && <div className='text-destructive pl-2 text-xs -my-6'>{serverError}</div>}
      </div>
    </>
  )
}
