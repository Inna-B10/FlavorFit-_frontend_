import type { Metadata } from 'next'
import { RegistrationData } from '@/features/auth/components/RegistrationData'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Registration',
  ...NO_INDEX_PAGE
}

export default function RegistrationPage() {
  return <RegistrationData />
}
