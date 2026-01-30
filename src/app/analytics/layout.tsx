import { Layout } from '@/shared/components/layout/Layout'
import type { PropsWithChildren } from 'react'

export default function AnalyticsLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}
