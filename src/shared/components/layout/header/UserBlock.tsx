import { PAGE } from '@/shared/config/public-pages.config'
import { USER_PAGE } from '@/shared/config/user-pages.config'
import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

export function UserBlock({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<div className='flex items-center gap-2'>
			{isLoggedIn && (
				<Link
					href={USER_PAGE.NOTIFICATION}
					title='Notification'
					aria-label='Check notification'
					className='rounded-full bg-pale-white text-dark-green shadow-sm p-2 xl:p-3 hover:cursor-pointer hover:bg-light-green hover:text-foreground transition-colors duration-300 ease-in-out'
				>
					<FaRegBell className='size-[16] md:size-[18] xl:size-[22]' />
				</Link>
			)}
			<Link
				href={PAGE.CONTACT}
				title='Contact'
				aria-label='Go to contact form'
				className='rounded-full bg-pale-white text-dark-green p-2 shadow-sm xl:p-3 hover:cursor-pointer hover:bg-light-green hover:text-foreground transition-colors duration-300 ease-in-out'
			>
				<TfiHeadphoneAlt className='size-[16] md:size-[18] xl:size-[22]' />
			</Link>

			{/* //[TODO] isLoggedIn, change guest icon, user avatar+name      */}
			{/* //[TODO] Login/Registration page      */}
			{isLoggedIn ? (
				<Link
					href={USER_PAGE.PROFILE}
					title='Profile'
					aria-label='Go to profile'
					className='-m-1 text-sm xl:text-2xl hover:cursor-pointer'
				>
					<PiUserCircleDuotone
						className='size-[40] xl:size-[54]'
						fill='#285430'
						strokeWidth={4}
						stroke='#e5d9b6'
					/>
				</Link>
			) : (
				<Link
					href='/auth'
					title='Login/Register'
					aria-label='Go to login/registration page'
					className='-m-1 text-sm xl:text-2xl hover:cursor-pointer'
				>
					<PiUserCircleDuotone
						className='size-[40] xl:size-[54]'
						fill='#285430'
						strokeWidth={4}
						stroke='#e5d9b6'
					/>
				</Link>
			)}
		</div>
	)
}
