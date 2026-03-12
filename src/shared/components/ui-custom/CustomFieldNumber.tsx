import { InputHTMLAttributes, JSX } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { CustomLabel, Field } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  htmlFor?: string
  icon?: JSX.Element
  error?: string
  isWeight?: boolean
  isYear?: boolean
  registration: UseFormRegisterReturn
}
export function CustomFieldNumber({
  label,
  htmlFor,
  icon,
  isWeight = false,
  isYear = false,
  registration,
  error,
  ...props
}: Props) {
  return (
    <div className='w-full space-y-1.5'>
      <Field
        className='group relative'
        orientation='horizontal'
      >
        <InputGroup>
          <InputGroupInput
            placeholder=' '
            type='number'
            step={isWeight ? 0.1 : 1}
            {...registration}
            {...props}
          />
          <InputGroupAddon align='inline-start'>{icon}</InputGroupAddon>
        </InputGroup>
        <CustomLabel
          htmlFor={htmlFor}
          className='floating-label'
        >
          {label} <span className='text-xs'>{isYear ? '' : isWeight ? '[kg]' : '[cm]'}</span>
        </CustomLabel>
      </Field>
      <div className='h-4 content-center'>
        {error && <div className='text-destructive pl-3 text-xs'>{error}</div>}
      </div>
    </div>
  )
}
