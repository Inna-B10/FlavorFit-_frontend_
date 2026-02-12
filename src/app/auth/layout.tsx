import { LogoName } from '@/shared/components/ui/logo/LogoName'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
		return (
				<main className='w-full content-center min-h-screen'>
					<div className='m-auto lg:max-w-1/2 flex flex-col gap-8 bg-pale-white rounded-2xl shadow-md p-6'>
						<div className='self-start'>
							<LogoName className='text-dark-green' />
						</div>
						{children}
					</div>
					</main>
		)
}
