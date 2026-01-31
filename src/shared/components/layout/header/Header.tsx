import { LogoIcon } from '@/shared/ui/logo/LogoIcon'
import Link from 'next/link'
import { Navbar } from './navbar/Navbar'
import { UserBlock } from './UserBlock'

export function Header() {
	//[TODO] isLoggedIn
	const isLoggedIn = true

	return (
		<header className='flex justify-between items-center gap-4 text-center'>
			<div className='flex items-center xl:gap-4'>
				<Link
					href='/'
					title='Home'
					aria-label='Go to homepage'
					className='h-10 xl:h-14 w-fit rounded-full bg-dark-green p-2.5 mr-2 xl:mr-1 shadow-md hover:scale-105 transition-all duration-300 ease-in-out'
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
