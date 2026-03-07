import Link from 'next/link'
import cn from 'clsx'
import { NAVBAR_MENU_ICONS } from '@/shared/constants/menu.data'
import type { INavbarItem } from '@/shared/types/navbar.types'

interface IMenuItem {
  item: INavbarItem
  isActive: boolean
}

export function MenuItem({ item, isActive }: IMenuItem) {
  const Icon = NAVBAR_MENU_ICONS[item.icon]
  return (
    <li>
      <Link
        href={item.link}
        title={item.label}
        aria-label={`Go to ${item.label} page`}
        className={cn(
          'group flex items-center justify-center rounded-full p-2 text-sm shadow-sm lg:gap-0.5 lg:rounded-4xl lg:px-3 lg:py-1 xl:gap-1 xl:rounded-4xl xl:px-4 xl:py-2 no-underline xl:text-base',
          {
            'bg-gradient-white-pale text-green-dark hover:bg-gradient-green-light hover:text-foreground transition-all duration-300 ease-in-out':
              !isActive,
            'bg-gradient-green-light text-foreground hover:cursor-default': isActive
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
