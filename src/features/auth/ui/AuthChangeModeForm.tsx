import Link from 'next/link'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'

export function AuthChangeModeForm({ isLogin }: { isLogin: boolean }) {
  const link = isLogin ? PUBLIC_PAGES.REGISTRATION : PUBLIC_PAGES.LOGIN
  const linkText = isLogin ? 'Sign up' : 'Sign in'
  const label = isLogin ? 'Already have an account?' : "Don't have an account?"

  return (
    <>
      {isLogin && (
        <div className='text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm text-nowrap'>
          <Link
            href='/auth/request-verification-email'
            aria-label='Get a new verification link'
            className='hover:text-foreground no-underline'
          >
            Resend verification email
          </Link>{' '}
          |{' '}
          <Link
            href='/auth/request-reset-password'
            aria-label='Forgot password'
            className='hover:text-foreground no-underline'
          >
            Forgot password
          </Link>
        </div>
      )}
      <span className='text-xs'>{label}</span>{' '}
      <Link
        href={link}
        title={linkText}
        className='text-sm text-nowrap underline-offset-2'
      >
        {linkText}
      </Link>
    </>
  )
}
