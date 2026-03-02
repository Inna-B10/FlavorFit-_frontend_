import { Suspense } from 'react'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import { VerifyEmail } from './VerifyEmailClient'

export const metadata: Metadata = {
  title: 'Login',
  ...NO_INDEX_PAGE
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmail />
    </Suspense>
  )
}
