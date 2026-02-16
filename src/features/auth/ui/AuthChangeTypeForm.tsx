import Link from 'next/link'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'

interface IAuthChangeTypeForm {
	isLogin: boolean
	errorMessage?: string
}

export function AuthChangeTypeForm({ isLogin, errorMessage }: IAuthChangeTypeForm) {
	return (
		<div className='my-2'>
			<div className='h-8'>
				{errorMessage && <p className='text-destructive text-xs'>{errorMessage}</p>}
			</div>
			{isLogin ? (
				<>
					<span className='text-xs'>Don&apos;t have an account?</span>{' '}
					<Link
						href={PUBLIC_PAGES.REGISTRATION}
						className='text-sm text-nowrap underline'
					>
						Sign up
					</Link>
				</>
			) : (
				<>
					<span className='text-xs'>Already have an account?</span>{' '}
					<Link
						href={PUBLIC_PAGES.LOGIN}
						className='text-sm text-nowrap underline'
					>
						Sign in
					</Link>
				</>
			)}
		</div>
	)
}
