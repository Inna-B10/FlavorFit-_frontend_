import Image from 'next/image'
import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { clearLoggedInFlag } from '@/features/auth/hooks/useIsLoggedIn'
import { PUBLIC_PAGES, USER_PAGES } from '@/shared/config/pages.config'
import { UserModel } from '@/__generated__/graphql.types'
import { Button } from '../../ui/button'

export function UserBlock({ isLoggedIn, user }: { isLoggedIn: boolean; user: UserModel }) {
  return (
    <div className='flex items-center gap-2'>
      {/* //[TODO] delete it*/}
      {isLoggedIn && (
        <Button
          onClick={clearLoggedInFlag}
          title='Logout'
          className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light h-full rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
        >
          <LiaSignOutAltSolid className='size-[16] md:size-[18] xl:size-[22]' />
        </Button>
      )}
      {isLoggedIn && (
        <Link
          href={USER_PAGES.NOTIFICATION}
          title='Notification'
          aria-label='Check notification'
          className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
        >
          <FaRegBell className='size-[16] md:size-[18] xl:size-[22]' />
        </Link>
      )}
      <Link
        href={PUBLIC_PAGES.CONTACT}
        title='Contact'
        aria-label='Go to contact form'
        className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
      >
        <TfiHeadphoneAlt className='size-[16] md:size-[18] xl:size-[22]' />
      </Link>

      {/* //[TODO] isLoggedIn, change guest icon, user avatar+name      */}
      {/* //[TODO] user menu: account, profile, orders, sign out, shopping list      */}
      {isLoggedIn ? (
        <Link
          href={USER_PAGES.PROFILE}
          title='Profile'
          aria-label='Go to profile'
          className='-m-1 text-sm hover:cursor-pointer xl:text-2xl'
        >
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.firstName}
              width={40}
              height={40}
              className='rounded-full'
            />
          ) : (
            <PiUserCircleDuotone
              className='size-[40] xl:size-[54]'
              fill='#285430'
              strokeWidth={4}
              stroke='#F2E7BD'
            />
          )}
        </Link>
      ) : (
        // <div className='bg-gradient-green-dark border-green-dark rounded-full border'>
        //   <Image
        //     src='https://cdn-icons-png.flaticon.com/512/706/706816.png'
        //     // src='https://i.pravatar.cc/150?img=3'
        //     // src='https://avatars.githubusercontent.com/u/0?v1'
        //     alt={user.firstName}
        //     width={42}
        //     height={42}
        //     className='rounded-full'
        //   />
        // </div>
        <Link
          href={PUBLIC_PAGES.LOGIN}
          title='Login/Registration'
          aria-label='Go to authentication page'
          className='-m-1 text-sm hover:cursor-pointer xl:text-2xl'
        >
          <PiUserCircleDuotone
            className='size-[40] xl:size-[54]'
            fill='#285430'
            strokeWidth={4}
            stroke='#F2E7BD'
          />
        </Link>
      )}
    </div>
  )
}
