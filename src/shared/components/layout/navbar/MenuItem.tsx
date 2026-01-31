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
				className={cn('group flex gap-1.5 justify-center items-center rounded-4xl py-2 px-4', {
					'bg-[#EBEBEB] hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out':
						!isActive,
					'bg-foreground text-background hover:cursor-default': isActive
				})}
			>
				<Icon size={22} />
				<span className='group-hover'>{item.label}</span>
			</Link>
		</li>
	)
}
