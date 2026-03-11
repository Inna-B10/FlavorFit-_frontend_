import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'
import { match } from 'path-to-regexp'
import { LogoutButton } from '@/shared/components/ui-custom/LogoutButton'
import { UserAvatar } from '@/shared/components/user-menu/UserAvatar'
import { USER_MENU_DATA, USER_MENU_ICONS } from '@/shared/constants/menu.data'
import { cn } from '@/shared/utils/utils'
import { UserModel } from '@/__generated__/graphql'

export function UserSidebar({ user }: { user: UserModel }) {
  const pathname = usePathname()
  return (
    <aside className='bg-linear-to-b to-20% from-green-light to-white-pale xl:flex flex-col w-2xs border-input border rounded-2xl hidden'>
      <div className='flex items-center gap-4 p-4'>
        <div className='w-full h-full max-w-12 aspect-square'>
          <UserAvatar
            firstName={user.firstName}
            avatarUrl={user.avatarUrl}
          />
        </div>
        <h3 className='font-semibold font-sansita text-lg'>Hello {user.firstName}!</h3>
      </div>
      {USER_MENU_DATA.map((item, idx) => {
        const isActive = !!match(item.link)(pathname)
        const Icon = USER_MENU_ICONS[item.icon]

        return (
          <span
            key={idx}
            className={cn(
              'hover:bg-gradient-white-double transition-colors cursor-pointer',
              isActive && 'text-green-medium underline underline-offset-2 font-semibold'
            )}
          >
            <Link
              href={item.link}
              title={item.label}
              aria-label={`Go to ${item.label} page`}
              className='no-underline flex items-center gap-2 rounded-lg text-sm px-4 py-2'
            >
              <Icon className='size-4 xl:size-5 xl:font-normal' />
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
