import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { PUBLIC_PAGES, USER_PAGES } from '@/shared/config/pages.config'

export function UserBlock({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className='flex items-center gap-2'>
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
      {/* //[TODO] Login/Registration page      */}
      {isLoggedIn ? (
        <Link
          href={USER_PAGES.PROFILE}
          title='Profile'
          aria-label='Go to profile'
          className='-m-1 text-sm hover:cursor-pointer xl:text-2xl'
        >
          <PiUserCircleDuotone
            className='size-[40] xl:size-[54]'
            fill='#285430'
            strokeWidth={4}
            stroke='#F2E7BD'
          />
        </Link>
      ) : (
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
