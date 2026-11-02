import type { PropsWithChildren } from 'react'
import { Layout } from '@/shared/components/layout/Layout'
import { PublicHeader } from '@/shared/components/layout/header/PublicHeader'

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return <Layout header={<PublicHeader />}>{children}</Layout>
}
