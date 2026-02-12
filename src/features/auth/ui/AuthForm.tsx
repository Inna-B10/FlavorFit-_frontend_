'use client'

import { LoginDocument } from '@/__generated__/graphql'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useMutation } from '@apollo/client/react'

interface IAuthForm {
  type: 'login' | 'register'
}

export function AuthForm({type}: IAuthForm) {
  const [login, { loading }] = useMutation(LoginDocument)

   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email'))
    const password = String(form.get('password'))

    try {
      const result = await login({
        variables: {
          data: { email, password }
        }
      })

      console.log('Mutation result:', result)
      console.log('Access token:', result.data?.login.accessToken)
      console.log('User:', result.data?.login.user)

    } catch (error) {
      console.error('Login error:', error)
    }
  }


  return (
  <div className='w-full m-auto flex flex-col items-center gap-4'>
    <h2 className='text-center text-2xl font-bold'>
      {type === 'register' ? 'Sign up' : 'Sign in'}
    </h2>
    <form onSubmit={onSubmit} className='w-full max-w-2/3 flex flex-col gap-6 mb-8'>
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button type="submit" disabled={loading} className='bg-accent text-foreground m-auto text-lg'>{loading? 'Loading...' : type === 'register' ? 'Sign up' : 'Sign in'}</Button>
    </form>
  </div>
  )
}
