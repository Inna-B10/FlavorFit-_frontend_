import type { Metadata } from 'next'
import AuthRequestActions from '@/features/auth/components/AuthRequestActions'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Login',
  ...NO_INDEX_PAGE
}

export default function RequestVerificationEmailPage() {
  return <AuthRequestActions mode='verify-email' />
}
