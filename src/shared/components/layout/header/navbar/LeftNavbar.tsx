import { LEFT_NAVBAR_DATA, RIGHT_NAVBAR_DATA } from '@/shared/constants/menu.data'
import { NavbarMenu } from './NavbarMenu'

export function LeftNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav>
      <ul className='flex items-center gap-2'>
        <NavbarMenu menu={LEFT_NAVBAR_DATA} />

        {/* //#-------------------------------- User Menu */}
        {isLoggedIn && <NavbarMenu menu={RIGHT_NAVBAR_DATA} />}
      </ul>
    </nav>
  )
}
