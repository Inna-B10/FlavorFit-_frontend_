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
  <>
    <h1>
      {type === 'register' ? 'Sign up' : 'Sign in'}
    </h1>
    <form onSubmit={onSubmit}>
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button type="submit" disabled={loading}>{loading? 'Loading...' : type === 'register' ? 'Sign up' : 'Sign in'}</Button>
    </form>
  </>
  )
}
