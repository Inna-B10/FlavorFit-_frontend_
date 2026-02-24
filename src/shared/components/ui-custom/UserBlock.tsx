import Link from 'next/link'
import { BellIcon, BookUser, LogOutIcon, ShoppingCart, UserRoundCog } from 'lucide-react'
import { TbShoppingBagCheck } from 'react-icons/tb'
import { USER_PAGES } from '@/shared/config/pages.config'
import { UserModel } from '@/__generated__/graphql'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { DefaultAvatar } from './DefaultAvatar'
import { LogoutButton } from './LogoutButton'

export function UserBlock({ user }: { user: UserModel }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='responsive'
          className='bg-gradient-white-pale hover:bg-gradient-green-light text-green-dark hover:text-foreground rounded-full shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:opacity-80'
          aria-label='Open user menu'
          title='Open user menu'
        >
          <Avatar className='flex h-full w-full items-center justify-center'>
            {user.avatarUrl ? (
              <AvatarImage
                src={user.avatarUrl}
                alt={user.firstName}
                width={40}
                height={40}
              />
            ) : (
              <DefaultAvatar className='size-7' />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='from-green-light to-white-pale rounded-xl border-0 bg-linear-to-b to-20% p-0'
      >
        <div className='p-4 pb-2 font-semibold'>Hello {user.firstName}!</div>
        <DropdownMenuGroup>
          <Link
            href={USER_PAGES.ACCOUNT}
            className='no-underline'
            title='Account'
            aria-label='Go to account page'
          >
            <DropdownMenuItem className='px-4'>
              <UserRoundCog className='text-foreground' />
              Account
            </DropdownMenuItem>
          </Link>
          <Link
            href={USER_PAGES.PROFILE}
            className='no-underline'
            title='Profile'
            aria-label='Go to profile page'
          >
            <DropdownMenuItem className='px-4'>
              <BookUser className='text-foreground' />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link
            href={USER_PAGES.NOTIFICATION}
            className='no-underline'
            title='Notifications'
            aria-label='Go to notifications page'
          >
            <DropdownMenuItem className='px-4'>
              <BellIcon className='text-foreground' />
              Notifications
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link
            href={USER_PAGES.CART}
            className='no-underline'
            title='My cart'
            aria-label='Open my cart'
          >
            <DropdownMenuItem className='px-4'>
              <ShoppingCart className='text-foreground' />
              Cart
            </DropdownMenuItem>
          </Link>
          <Link
            href='/user/orders'
            className='no-underline'
            title='My orders'
            aria-label='Go to my orders'
          >
            <DropdownMenuItem className='px-4'>
              <TbShoppingBagCheck className='text-foreground' />
              Orders
            </DropdownMenuItem>
          </Link>
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
