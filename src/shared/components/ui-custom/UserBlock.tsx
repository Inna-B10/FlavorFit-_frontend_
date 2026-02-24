import Link from 'next/link'
import { BadgeCheckIcon, BellIcon, LogOutIcon, ShoppingCart } from 'lucide-react'
import { CgProfile } from 'react-icons/cg'
import { LuUserRound } from 'react-icons/lu'
import { TbShoppingBagCheck } from 'react-icons/tb'
import { USER_PAGES } from '@/shared/config/pages.config'
import { UserModel } from '@/__generated__/graphql'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { LogoutButton } from './LogoutButton'

export function UserBlock({ user }: { user: UserModel }) {
  const avatar = 'https://cdn-icons-png.flaticon.com/512/706/706816.png'
  // const avatar = user.avatarUrl || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon-xl'
          className='bg-gradient-white-pale text-green-dark hover:text-foreground hover:bg-gradient-green-light rounded-full p-2 shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer xl:p-3'
          aria-label='Open user menu'
          title={`Hello, ${user.firstName}`}
        >
          <Avatar size='xl'>
            <AvatarImage
              src={avatar}
              alt={user.firstName}
              width={40}
              height={40}
              className='rounded-full'
            />
            <AvatarFallback>
              <LuUserRound className='size-[40] xl:size-[26]' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        // className='relative -top-6 right-6'
      >
        <div className='from-green-light rounded-t bg-linear-to-b to-white p-2'>
          Hello {user.firstName}!
        </div>
        <DropdownMenuGroup>
          <Link
            href={USER_PAGES.ACCOUNT}
            className='no-underline'
            title='Account'
            aria-label='Go to account page'
          >
            <DropdownMenuItem>
              <BadgeCheckIcon className='text-foreground' />
              Account
            </DropdownMenuItem>
          </Link>
          <Link
            href={USER_PAGES.PROFILE}
            className='no-underline'
            title='Profile'
            aria-label='Go to profile page'
          >
            <DropdownMenuItem>
              <CgProfile className='text-foreground' />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link
            href={USER_PAGES.NOTIFICATION}
            className='no-underline'
            title='Notifications'
            aria-label='Go to notifications page'
          >
            <DropdownMenuItem>
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
            <DropdownMenuItem>
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
            <DropdownMenuItem>
              <TbShoppingBagCheck className='text-foreground' />
              My orders
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton className='w-full'>
          <DropdownMenuItem
            variant='destructive'
            className='w-full'
          >
            <LogOutIcon className='text-destructive/80' />
            Sign out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
