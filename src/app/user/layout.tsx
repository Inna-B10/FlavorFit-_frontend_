import type { PropsWithChildren } from 'react'
import { headers } from 'next/headers'
import type { AuthAvailabilityStatus } from '@/shared/components/auth/AuthAvailabilityContext'
import { AuthAvailabilityGate } from '@/shared/components/auth/AuthAvailabilityGate'
import { AuthAvailabilityProvider } from '@/shared/components/auth/AuthAvailabilityProvider'
import { Layout } from '@/shared/components/layout/Layout'
import { UserHeader } from '@/shared/components/layout/header/UserHeader'

export default async function UserLayout({ children }: PropsWithChildren<unknown>) {
  const headersList = await headers()
  const authStatus = headersList.get('x-auth-status')

  const initialStatus: AuthAvailabilityStatus =
    authStatus === 'unavailable' ? 'unavailable' : 'available'

  return (
    <AuthAvailabilityProvider initialStatus={initialStatus}>
      <Layout header={<UserHeader />}>
        <AuthAvailabilityGate>{children}</AuthAvailabilityGate>
      </Layout>
    </AuthAvailabilityProvider>
  )
}
