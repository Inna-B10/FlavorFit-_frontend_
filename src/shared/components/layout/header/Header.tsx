import { LogoIcon } from '@/shared/ui/logo/LogoIcon'
import Link from 'next/link'
import { Navbar } from './navbar/Navbar'
import { UserBlock } from './UserBlock'

export function Header() {
	//[TODO] isLoggedIn
	const isLoggedIn = true

	return (
		<header className='flex justify-between items-center gap-4 text-center'>
			<div className='flex items-center gap-6'>
				<Link
					href='/'
					title='Home'
					aria-label='Go to homepage'
					className='h-16 w-fit rounded-full bg-dark-green p-3 mr-2'
				>
					<LogoIcon className='h-full w-auto text-pale-white' />
				</Link>
				<Navbar isLoggedIn={isLoggedIn} />
			</div>
			{/* //#------------------------------- User Block */}
			<UserBlock isLoggedIn={isLoggedIn} />
		</header>
	)
}
