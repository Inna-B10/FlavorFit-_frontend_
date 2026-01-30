import { Layout } from '@/shared/components/layout/Layout'
import type { PropsWithChildren } from 'react'

export default function MealPlansLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}
