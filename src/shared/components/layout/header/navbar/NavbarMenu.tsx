'use client'

import type { INavbarItem } from '@/shared/types/navbar.types'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
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
