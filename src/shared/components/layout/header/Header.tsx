import Link from 'next/link'
import { LogoIcon } from '@/shared/components/ui-custom/logo/LogoIcon'
import type { UserModel } from '@/__generated__/graphql.types'
import { LeftNavbar } from './navbar/LeftNavbar'
import { RightNavbar } from './navbar/RightNavbar'

type HeaderProps = {
  user: UserModel | null
  isLoggedIn: boolean
}

export function Header({ user, isLoggedIn }: HeaderProps) {
  return (
    <header className='flex items-center justify-between gap-4 text-center'>
      <div className='flex items-center xl:gap-4'>
        <Link
          href='/'
          title='Homepage'
          aria-label='Go to homepage'
          className='bg-gradient-green-dark mr-2 h-10 w-fit rounded-full p-3 shadow-md transition-all duration-300 ease-in-out hover:scale-105 xl:mr-1 xl:h-14'
        >
          <LogoIcon className='text-white-pale h-full w-auto' />
        </Link>
        <LeftNavbar isLoggedIn={isLoggedIn} />
      </div>

      <RightNavbar
        isLoggedIn={isLoggedIn}
        user={user}
      />
    </header>
  )
}
