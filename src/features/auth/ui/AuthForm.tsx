import { useForm } from 'react-hook-form'
import { Field } from '@/shared/components/ui-custom/Field'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { IAuthFormInput, TAuthFormData } from '../types/auth-form.types'
import { isValidEmail } from '../utils/is-valid-check'
import { AuthChangeModeForm } from './AuthChangeModeForm'

export function AuthForm({ mode, loading, onSubmit, serverMessage }: TAuthFormData) {
  const isLogin = mode === 'login'

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, submitCount },
    getValues,
    setError,
    clearErrors
  } = useForm<IAuthFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: ''
    }
  })

  const handleAuth = async (values: IAuthFormInput) => {
    clearErrors('root')
    try {
      await onSubmit(values)
    } catch (e) {
      setError('root', { type: 'server', message: 'Something went wrong' })
    }
  }

  const rootMessage = submitCount > 0 ? errors.root?.message || serverMessage : undefined

  return (
    <>
      <h2 className='font-sansita my-4 text-center text-4xl font-bold italic'>
        {isLogin ? 'Sign in' : 'Sign up'}
      </h2>
      <form
        onSubmit={handleSubmit(handleAuth)}
        name='auth'
        className='w-full space-y-1 sm:max-w-2/3'
      >
        <Field error={errors.email?.message}>
          <Input
            {...register('email', {
              required: 'Email is required!',
              setValueAs: v => (typeof v === 'string' ? v.trim().toLowerCase() : v),
              validate: v => isValidEmail(v) || 'Invalid email'
            })}
            type='email'
            name='email'
            autoComplete='email'
            placeholder='Email'
            required
            autoFocus
          />
        </Field>
        <Field error={errors.password?.message}>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            type='password'
            name='password'
            placeholder='Password'
            required
          />
        </Field>
        {!isLogin && (
          <>
            <Field error={errors.confirmPassword?.message}>
              <Input
                {...register('confirmPassword', {
                  required: 'Password confirmation is required',
                  validate: value => value === getValues('password') || 'Passwords don`t match!'
                })}
                placeholder='Password confirmation'
                type='password'
                name='confirmPassword'
                required
              />
            </Field>
            <Field error={errors.firstName?.message}>
              <Input
                {...register('firstName', {
                  required: 'First name is required',
                  setValueAs: v => (typeof v === 'string' ? v.trim() : v)
                })}
                type='text'
                name='firstName'
                placeholder='First name'
                required
              />
            </Field>
          </>
        )}
        <Button
          type='submit'
          disabled={loading || isSubmitting || !isValid}
          className='bg-accent text-foreground text-md mt-4 w-full'
        >
          {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
      <div className='my-1 w-full text-center'>
        <div className='h-9!'>
          {rootMessage && <p className='text-destructive text-xs'>{rootMessage}</p>}
        </div>
        <AuthChangeModeForm isLogin={isLogin} />
      </div>
    </>
  )
}
