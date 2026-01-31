import { NAVBAR_DATA, USER_NAVBAR_DATA } from '@/shared/constants/navbar.data'
import { NavbarMenu } from './NavbarMenu'

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<nav>
			<ul className='flex gap-2 items-center'>
				<NavbarMenu menu={NAVBAR_DATA} />

				{/* //#-------------------------------- User Menu */}
				{isLoggedIn && <NavbarMenu menu={USER_NAVBAR_DATA} />}
			</ul>
		</nav>
	)
}
