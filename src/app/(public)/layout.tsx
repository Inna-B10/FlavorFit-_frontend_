import { Layout } from '@/shared/components/layout/Layout'
import { PropsWithChildren } from 'react'

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}
