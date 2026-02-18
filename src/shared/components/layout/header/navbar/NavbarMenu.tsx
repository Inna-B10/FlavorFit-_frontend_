'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import type { INavbarItem } from '@/shared/types/navbar.types'
import { MenuItem } from './MenuItem'

interface Props {
  menu: INavbarItem[]
}

export function NavbarMenu({ menu }: Props) {
  const pathname = usePathname()

  return (
    <>
      {menu.map(menuItem => {
        const isActive = !!match(menuItem.link)(pathname)

        return (
          <MenuItem
            key={menuItem.label}
            item={menuItem}
            isActive={isActive}
          />
        )
      })}
    </>
  )
}
