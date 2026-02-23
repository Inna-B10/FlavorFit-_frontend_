import type { Metadata } from 'next'
import { LoginData } from '@/features/auth/components/LoginData'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Login',
  ...NO_INDEX_PAGE
}

export default function LoginPage() {
  return <LoginData />
}
