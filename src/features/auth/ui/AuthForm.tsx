'use client'

import { LoginDocument, RegisterDocument } from '@/__generated__/graphql'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { useMutation } from '@apollo/client/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IAuthForm {
  type: 'login' | 'register'
}

export function AuthForm({type}: IAuthForm) {
  const isLogin = type === 'login'
  const router = useRouter()

  const [login, { data, loading, error }] = useMutation(isLogin ? LoginDocument : RegisterDocument)

   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    try {
      const result = await login({
        variables: {
          data: { email, password }
        }
      })

      const token = result.data?.login.accessToken
       if (!token) return
       
      console.log('Mutation result:', result)
      console.log('Access token:', token)
      console.log('User:', result.data?.login.user)

      localStorage.setItem('accessToken', token)
      router.push('/')

    } catch (error) {
      console.error('Login error:', error)
    }
  }


  return (
  <div className='max-w-md m-auto flex flex-col items-center justify-center gap-4 bg-pale-white rounded-2xl shadow-md p-6'>
    <h2 className='text-center text-4xl font-bold font-sansita italic my-4'>
      {isLogin ? 'Sign in' : 'Sign up'}
    </h2>
    <form onSubmit={onSubmit} className='w-full sm:max-w-2/3 space-y-4'>
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      {!isLogin && <Input type="text" name="firstName" placeholder="First name" required />}
      <Button type="submit" disabled={loading} className='w-full bg-accent text-foreground text-md mt-4'>{loading? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'}</Button>
    </form>
      <div className='my-2'>
        <div className='h-8'>
          {error && <p className='text-destructive text-xs'>{error.message}</p>}</div>
          {isLogin ?(
            <>
              <span  className='text-xs'>Don&apos;t have an account?</span>{" "}
              <Link href={PUBLIC_PAGES.REGISTRATION} className='text-sm underline text-nowrap'>Sign up</Link>
            </>
          ):(
            <>
              <span className='text-xs'>Already have an account?</span>{" "}
              <Link href={PUBLIC_PAGES.LOGIN} className='text-sm underline text-nowrap'>Sign in</Link>
            </>
            )}
      </div>
  </div>
  )
}
