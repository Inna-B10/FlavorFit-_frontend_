import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { LogoutButton } from '@/shared/components/ui-custom/LogoutButton'
import { UserMenuHeader } from '@/shared/components/user-menu/UserMenuHeader'
import { USER_MENU_DATA, USER_MENU_ICONS } from '@/shared/constants/menu.data'
import { cn } from '@/shared/utils/utils'
import { UserModel } from '@/__generated__/graphql'

export function UserSidebar({ user }: { user: UserModel }) {
  return (
    <aside className='bg-linear-to-b to-20% from-green-light to-white-pale flex flex-col w-2xs border-input border rounded-2xl'>
      <span className='p-4'>
        <UserMenuHeader
          firstName={user.firstName}
          avatarUrl={user.avatarUrl}
        />
      </span>
      {USER_MENU_DATA.map((item, idx) => {
        const Icon = USER_MENU_ICONS[item.icon]
        return (
          <span
            key={idx}
            className='hover:bg-gradient-white-double transition-colors cursor-pointer'
          >
            <Link
              href={item.link}
              title={item.label}
              aria-label={`Go to ${item.label} page`}
              className='no-underline flex items-center gap-2 rounded-lg text-sm text-foreground px-4 py-2 '
            >
              <Icon className='text-foreground size-4 xl:size-5 xl:font-normal' />
              {item.label}
            </Link>
            <div className={cn('bg-border mx-2', idx === 2 && 'mt-2 mb-1 h-px')} />
          </span>
        )
      })}
      <div className='bg-border mx-2 mt-2 h-px' />
      <LogoutButton className='w-full text-destructive/80 text-sm p-4 hover:bg-gradient-white-double transition-colors cursor-pointer hover:rounded-b-2xl'>
        <LogOutIcon size={16} />
        Sign out
      </LogoutButton>
    </aside>
  )
}
