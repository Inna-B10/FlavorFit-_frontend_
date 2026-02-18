import Link from 'next/link'
import cn from 'clsx'
import type { IconType } from 'react-icons'
import { BiBookBookmark } from 'react-icons/bi'
import { FaNutritionix } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { ImStatsBars } from 'react-icons/im'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'
import type { INavbarItem, NavbarIcon } from '@/shared/types/navbar.types'

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
          'group flex items-center justify-center rounded-full p-2 text-sm shadow-sm lg:gap-0.5 lg:rounded-4xl lg:px-3 lg:py-1 xl:gap-1.5 xl:rounded-4xl xl:px-4 xl:py-2',
          {
            'bg-pale-white text-dark-green hover:bg-light-green hover:text-foreground transition-all duration-300 ease-in-out':
              !isActive,
            'bg-light-green text-foreground hover:cursor-default': isActive
          }
        )}
      >
        <Icon className='size-[16] md:size-[18] xl:size-[22]' />
        <span className='group-hover font-inter-tight hidden text-nowrap lg:block'>
          {item.label}
        </span>
      </Link>
    </li>
  )
}
