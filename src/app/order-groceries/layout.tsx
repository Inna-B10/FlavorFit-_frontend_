import type { PropsWithChildren } from 'react'
import { Layout } from '@/shared/components/layout/Layout'

export default function OrderGroceriesLayout({ children }: PropsWithChildren<unknown>) {
  return <Layout>{children}</Layout>
}
