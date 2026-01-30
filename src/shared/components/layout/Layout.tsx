import { LogoIcon } from '@/shared/ui/logo/LogoIcon'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Navbar } from './navbar/Navbar'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='p-6 min-h-screen'>
			<header className='flex justify-between items-center gap-4 text-center'>
				<div className='flex items-center gap-6'>
					<Link
						href='/'
						title='Home'
						aria-label='Go to homepage'
						className='h-10 w-fit border border-violet rounded-full bg-violet p-2 mr-2'
					>
						<LogoIcon className='h-full w-auto text-white' />
					</Link>
					<Navbar />
				</div>
				<div>User Block</div>
			</header>
			<main className='flex min-h-screen w-full items-center justify-center py-32 px-16'>
				{children}
			</main>
		</div>
	)
}
