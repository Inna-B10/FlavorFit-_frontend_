import { Navbar } from '@/shared/components/navbar/Navbar'
import { LogoIcon } from '@/shared/ui/logo/LogoIcon'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='p-6'>
			<header className='flex justify-between items-center gap-4 text-center'>
				<div className='flex items-center gap-6'>
					<Link
						href='/'
						title='Home'
						className='h-10 w-fit border border-violet rounded-full bg-violet p-2 mr-2'
					>
						<LogoIcon className='h-full w-auto text-white' />
					</Link>
					<Navbar />
				</div>
				<div>User Block</div>
			</header>
			<main className='flex min-h-screen w-full items-center justify-center py-32 px-16'></main>
		</div>
	)
}
