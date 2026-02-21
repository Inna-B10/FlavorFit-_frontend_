'use client'
import Link from 'next/link'
import { useIsLoggedIn } from '@/features/auth/hooks/useIsLoggedIn'
import { LogoIcon } from '@/shared/components/ui/logo/LogoIcon'
import { UserBlock } from './UserBlock'
import { Navbar } from './navbar/Navbar'

export function Header() {
  //[TODO] delete it
  const isLoggedIn = useIsLoggedIn()

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
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      {/* //#------------------------------- User Block */}
      <UserBlock isLoggedIn={isLoggedIn} />
    </header>
  )
}
