import { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Header />
			<main className='w-full h-full flex flex-col gap-8 grow'>{children}</main>
		</>
	)
}
