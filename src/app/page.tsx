import { LogoIcon } from '@/shared/ui/LogoIcon'
import { LogoWordmark } from '@/shared/ui/LogoWordmark'

export default function Home() {
	return (
		<main className='flex min-h-screen w-full items-center justify-center py-32 px-16'>
			<div className='flex flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
				<div className='h-10 lg:h-18'>
					<LogoWordmark className='h-full w-auto text-violet' />
					<LogoIcon className='h-full w-auto text-violet' />
				</div>
			</div>
		</main>
	)
}
