import { FaRegBell, FaRegUserCircle } from 'react-icons/fa'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

export function UserBlock({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<div className='flex items-center gap-2'>
			<span className='rounded-full bg-white p-3 hover:cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out'>
				<TfiHeadphoneAlt size={22} />
			</span>
			<span className='rounded-full bg-white p-3 hover:cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out'>
				<FaRegBell size={22} />
			</span>

			{/* //[TODO] isLoggedIn, change guest icon      */}
			<div className='flex gap-2 items-center text-2xl hover:cursor-pointer'>
				{isLoggedIn ? (
					<>
						<FaRegUserCircle size={38} /> Jessica
					</>
				) : (
					<>
						<FaRegUserCircle size={38} /> Guest
					</>
				)}
			</div>
		</div>
	)
}
