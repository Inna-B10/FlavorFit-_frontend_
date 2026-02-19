import { PropsWithChildren } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoName } from '@/shared/components/ui/logo/LogoName'

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <main className='m-auto flex h-full w-full max-w-3xl flex-col items-center justify-center'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='hidden transition-all duration-300 ease-in-out hover:scale-102 sm:mt-4 sm:block sm:self-start'
      >
        <LogoName className='text-green-dark mb-6 h-auto w-30 sm:w-42 md:mb-10 md:w-62 xl:w-72' />
      </Link>
      {children}

      <Image
        src='/bg-images/vegetables.png'
        alt='auth-background'
        width={626}
        height={522}
        className='-mt-10 -mr-4 hidden h-auto w-40 sm:block sm:self-end md:w-60'
      />
    </main>
  )
}
