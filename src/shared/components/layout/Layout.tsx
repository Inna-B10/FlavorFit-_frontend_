import { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='p-6 min-h-screen'>
			<Header />
			<main className='flex w-full items-center justify-center py-32 px-16'>{children}</main>
		</div>
	)
}
