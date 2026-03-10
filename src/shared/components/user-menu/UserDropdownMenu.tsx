import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { USER_MENU_DATA, USER_MENU_ICONS } from '@/shared/constants/menu.data'
import { UserModel } from '@/__generated__/graphql'
import { LogoutButton } from '../ui-custom/LogoutButton'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { UserAvatar } from './UserAvatar'

export function UserDropdownMenu({ user }: { user: UserModel }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='responsive'
          className='rounded-full shadow-none'
          aria-label='Open user menu'
          title='Open user menu'
        >
          <UserAvatar
            firstName={user.firstName}
            avatarUrl={user.avatarUrl}
            className='hover:cursor-pointer hover:scale-105'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='from-green-light to-white-pale min-w-44 rounded-xl border-0 bg-linear-to-b to-20% p-0 pb-1'
      >
        <div className='p-4 pb-2 font-semibold font-sansita text-lg'>Hello {user.firstName}!</div>
        <DropdownMenuGroup>
          {USER_MENU_DATA.map((item, idx) => {
            const Icon = USER_MENU_ICONS[item.icon]
            return (
              <span key={idx}>
                <Link
                  href={item.link}
                  className='no-underline'
                  title={item.label}
                  aria-label={`Go to ${item.label} page`}
                >
                  <DropdownMenuItem className='px-4'>
                    <Icon className='text-foreground' />
                    {item.label}
                  </DropdownMenuItem>
                </Link>
                {idx === 2 && <DropdownMenuSeparator />}
              </span>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton className='w-full'>
          <DropdownMenuItem
            variant='destructive'
            className='w-full px-4'
          >
            <LogOutIcon className='text-destructive/80' />
            Sign out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
