import Link from 'next/link'
import { AUTH_PAGES } from '@/shared/config/pages.config'

export function AuthChangeModeForm({ isLogin }: { isLogin: boolean }) {
  const link = isLogin ? AUTH_PAGES.REGISTRATION : AUTH_PAGES.LOGIN
  const linkText = isLogin ? 'Sign up' : 'Sign in'
  const label = isLogin ? 'Already have an account?' : "Don't have an account?"

  return (
    <>
      {isLogin && (
        <div className='text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm text-nowrap'>
          <Link
            href={AUTH_PAGES.REQUEST_VERIFICATION_EMAIL}
            aria-label='Get a new verification link'
            className='hover:text-foreground no-underline'
          >
            Resend verification email
          </Link>{' '}
          |{' '}
          <Link
            href={AUTH_PAGES.REQUEST_RESET_PASSWORD}
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
