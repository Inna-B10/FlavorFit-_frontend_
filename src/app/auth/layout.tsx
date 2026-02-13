import { LogoName } from '@/shared/components/ui/logo/LogoName'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
		return (
				<main className='w-full h-full flex flex-col gap-8 sm:grow items-center justify-center'>
					<Link href='/' title='Homepage' aria-label='Go to homepage' className='sm:self-start sm:ml-6 sm:mt-4 hover:scale-102 transition-all duration-300 ease-in-out'>
						<LogoName className='text-dark-green h-auto w-42 md:w-62 xl:w-72' />
					</Link>
						{children}

							<Image src='/bg-images/vegetables.png' alt='auth-background' width={626} height={522} className='w-40 md:w-60 h-auto sm:self-end -mb-6' />
				</main>
		)
}
