import { AuthForm } from '@/features/auth/ui/AuthForm'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Registration',
  ...NO_INDEX_PAGE
}

export default function RegisterPage() {
  return <AuthForm type='register' />
}
