import { Suspense } from 'react'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import { ResetPasswordClient } from './ResetPasswordClient'

export const metadata: Metadata = {
  title: 'Login',
  ...NO_INDEX_PAGE
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordClient />
    </Suspense>
  )
}
