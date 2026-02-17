'use client'
import Link from 'next/link'
import { LogoIcon } from '@/shared/components/ui/logo/LogoIcon'
import { IS_CLIENT } from '@/shared/constants/app.constants'
import { UserBlock } from './UserBlock'
import { Navbar } from './navbar/Navbar'

export function Header() {
  //[TODO] isLoggedIn
  const token = IS_CLIENT ? localStorage.getItem('isLoggedIn') : null
  const isLoggedIn = token !== null

  return (
    <header className='flex items-center justify-between gap-4 text-center'>
      <div className='flex items-center xl:gap-4'>
        <Link
          href='/'
          title='Homepage'
          aria-label='Go to homepage'
          className='bg-dark-green mr-2 h-10 w-fit rounded-full p-3 shadow-md transition-all duration-300 ease-in-out hover:scale-105 xl:mr-1 xl:h-14'
        >
          <LogoIcon className='text-pale-white h-full w-auto' />
        </Link>
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      {/* //#------------------------------- User Block */}
      <UserBlock isLoggedIn={isLoggedIn} />
    </header>
  )
}
