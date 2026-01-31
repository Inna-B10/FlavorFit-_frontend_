import { PAGE } from '@/shared/config/public-pages.config'
import { USER_PAGE } from '@/shared/config/user-pages.config'
import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'
import { PiUserCircleThin } from 'react-icons/pi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

export function UserBlock({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<div className='flex items-center gap-2'>
			{isLoggedIn && (
				<Link
					href={USER_PAGE.NOTIFICATION}
					title='Notification'
					aria-label='Check notification'
					className='rounded-full bg-white p-3 hover:cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out'
				>
					<FaRegBell size={22} />
				</Link>
			)}
			<Link
				href={PAGE.CONTACT}
				title='Contact'
				aria-label='Go to contact form'
				className='rounded-full bg-white p-3 hover:cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out'
			>
				<TfiHeadphoneAlt size={22} />
			</Link>

			{/* //[TODO] isLoggedIn, change guest icon, user avatar+name      */}
			{/* //[TODO] Login/Registration page      */}
			<div>
				{isLoggedIn ? (
					<Link
						href={USER_PAGE.PROFILE}
						title='Profile'
						aria-label='Go to profile'
						className='flex gap-1 items-center text-2xl hover:cursor-pointer'
					>
						<PiUserCircleThin size={48} /> Jessica
					</Link>
				) : (
					<Link
						href='/auth'
						title='Login/Register'
						aria-label='Go to login/registration page'
						className='flex gap-1 items-center text-2xl hover:cursor-pointer'
					>
						<PiUserCircleThin size={48} /> Guest
					</Link>
				)}
			</div>
		</div>
	)
}
