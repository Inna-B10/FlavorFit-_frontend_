import { NAVBAR_PUBLIC_DATA, NAVBAR_USER_DATA } from '@/shared/constants/menu.data'
import { NavbarMenu } from './NavbarMenu'

export function LeftNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav>
      <ul className='flex items-center gap-2'>
        <NavbarMenu menu={NAVBAR_PUBLIC_DATA} />

        {/* //#-------------------------------- User Menu */}
        {isLoggedIn && <NavbarMenu menu={NAVBAR_USER_DATA} />}
      </ul>
    </nav>
  )
}
