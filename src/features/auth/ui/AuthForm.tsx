'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { Field } from '@/shared/components/ui/Field'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { LogoIcon } from '@/shared/components/ui/logo/LogoIcon'
import { USER_PAGES } from '@/shared/config/pages.config'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables
} from '@/__generated__/graphql'
import { setLoggedInFlag } from '../hooks/useIsLoggedIn'
import { IRegisterForm } from '../types/auth-form.types'
import { isValidEmail } from '../utils/isValidEmail'
import { AuthChangeTypeForm } from './AuthChangeTypeForm'

interface IAuthFormType {
  type: 'login' | 'register'
}

export function AuthForm({ type }: IAuthFormType) {
  const isLogin = type === 'login'
  const router = useRouter()

  const apolloClient = useApolloClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, submitCount },
    getValues,
    setError,
    clearErrors
  } = useForm<IRegisterForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: ''
    }
  })

  useEffect(() => {
    clearErrors('root')
  }, [type, clearErrors])

  const [login, loginState] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
  const [registerUser, registerState] = useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  )
  const loading = loginState.loading || registerState.loading

  const handleAuth = async (form: IRegisterForm) => {
    clearErrors('root')
    const result = isLogin
      ? await mutateWithToast(
          () =>
            login({
              variables: { data: { email: form.email, password: form.password } }
            }),
          {
            successMessage: 'Successfully signed in',
            errorMessage: 'Login failed'
          }
        )
      : await mutateWithToast(
          () =>
            registerUser({
              variables: {
                data: { email: form.email, password: form.password, firstName: form.firstName! }
              }
            }),
          {
            successMessage: 'Successfully registered',
            errorMessage: 'Registration failed'
          }
        )

    if (!result.data) {
      if (result.errorMessage) {
        setError('root', { type: 'server', message: result.errorMessage })
      }
      return
    }

    await apolloClient.resetStore()

    //[TODO] delete it
    setLoggedInFlag()

    if (isLogin) {
      router.replace(USER_PAGES.DASHBOARD)
      return
    }
    router.replace(`/auth/check-email?email=${encodeURIComponent(form.email)}`)
  }

  const serverMessage = submitCount > 0 ? errors.root?.message : undefined

  return (
    <div className='bg-white-pale relative m-auto flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-md'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='bg-green-dark absolute top-8 left-7 h-14 w-fit rounded-full p-2.5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 sm:hidden'
      >
        <LogoIcon className='text-white-pale h-full w-auto' />
      </Link>
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
      <AuthChangeTypeForm
        isLogin={isLogin}
        errorMessage={serverMessage}
      />
    </div>
  )
}
