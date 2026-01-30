import { NAVBAR_DATA } from '@/shared/constants/navbar.data'
import Link from 'next/link'

export function Navbar() {
	return (
		<nav className='flex gap-2 items-center'>
			{NAVBAR_DATA.map((menuItem, idx) => (
				<div
					key={idx}
					className='rounded-4xl bg-[#EBEBEB] py-2 px-4 hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out'
				>
					<Link
						href={menuItem.link}
						title={menuItem.label}
						aria-label={`Go to ${menuItem.label} page`}
						className='flex gap-1.5 justify-center items-center'
					>
						<menuItem.icon size={22} />
						<span>{menuItem.label}</span>
					</Link>
				</div>
			))}
		</nav>
	)
}
