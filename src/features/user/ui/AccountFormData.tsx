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
    formState: { errors, isValid }
  } = form

  return (
    <>
      <div className='w-full flex justify-between items-center mb-2 gap-4'>
        <h2 className='text-lg font-semibold pl-1'>First name</h2>
        <Button
          variant='accent'
          type='submit'
          size='xs'
          disabled={loading || !isValid || !form.formState.touchedFields.firstName}
          className='rounded-2xl px-4'
        >
          Save
        </Button>
      </div>

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
                required: 'First name is required!',
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
    </>
  )
}
