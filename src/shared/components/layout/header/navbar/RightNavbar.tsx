import Link from 'next/link'
import { LuUserRound } from 'react-icons/lu'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { UserModel } from '@/__generated__/graphql.types'
import { UserBlock } from '../../../ui-custom/UserBlock'

export function RightNavbar({ isLoggedIn, user }: { isLoggedIn: boolean; user: UserModel | null }) {
  return (
    <div className='flex items-center gap-2'>
      <Link
        href={PUBLIC_PAGES.CONTACT}
        title='Contact'
        aria-label='Go to contact form'
        className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
      >
        <TfiHeadphoneAlt className='size-[16] md:size-[18] xl:size-[22]' />
      </Link>

      {isLoggedIn && user ? (
        <UserBlock user={user} />
      ) : (
        <Link
          href={PUBLIC_PAGES.LOGIN}
          title='Login/Registration'
          aria-label='Go to authentication page'
          className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-2.5'
        >
          <LuUserRound className='size-[16] md:size-[18] xl:size-[26]' />
        </Link>
      )}
    </div>
  )
}
