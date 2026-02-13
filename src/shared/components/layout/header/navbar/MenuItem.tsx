import type { INavbarItem, NavbarIcon } from '@/shared/types/navbar.types'
import cn from 'clsx'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { BiBookBookmark } from 'react-icons/bi'
import { FaNutritionix } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { ImStatsBars } from 'react-icons/im'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'

interface IMenuItem {
	item: INavbarItem
	isActive: boolean
}

const ICONS: Record<NavbarIcon, IconType> = {
	recipes: BiBookBookmark,
	nutrition: FaNutritionix,
	forum: PiUsersFour,
	mealPlans: GiForkKnifeSpoon,
	analytics: ImStatsBars,
	orderGroceries: IoStorefrontOutline,
	dashboard: LuLayoutDashboard
}
export function MenuItem({ item, isActive }: IMenuItem) {
	const Icon = ICONS[item.icon]
	return (
		<li>
			<Link
				href={item.link}
				title={item.label}
				aria-label={`Go to ${item.label} page`}
				className={cn(
					'group flex lg:gap-0.5 xl:gap-1.5 justify-center items-center rounded-full p-2 text-sm lg:rounded-4xl lg:py-1 lg:px-3 xl:rounded-4xl xl:py-2 xl:px-4 shadow-sm ',
					{
						'bg-pale-white text-dark-green hover:bg-light-green hover:text-foreground transition-all duration-300 ease-in-out':
							!isActive,
						'bg-light-green text-foreground hover:cursor-default': isActive
					}
				)}
			>
				<Icon className='size-[16] md:size-[18] xl:size-[22]' />
				<span className='hidden lg:block group-hover text-nowrap font-inter-tight'>{item.label}</span>
			</Link>
		</li>
	)
}
