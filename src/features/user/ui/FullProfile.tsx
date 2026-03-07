'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client/react'
import { LogOutIcon } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LogoutButton } from '@/shared/components/ui-custom/LogoutButton'
import { SkeletonLoader } from '@/shared/components/ui-custom/SkeletonLoader'
import { UserMenuHeader } from '@/shared/components/user-menu/UserMenuHeader'
import { USER_MENU_DATA, USER_MENU_ICONS } from '@/shared/constants/menu.data'
import { cn } from '@/shared/utils/utils'
import { GetFullProfileDocument } from '@/__generated__/graphql'
import { FullProfileForm } from './FullProfileForm'

export function FullProfile() {
  const { data, loading } = useQuery(GetFullProfileDocument)
  const { user, isLoading } = useAuth()

  if (loading || !data?.fullProfile || isLoading || !user)
    //[TODO] style skeleton
    // if (true)
    return (
      <div>
        <div className='flex items-center justify-between mb-6'>
          <SkeletonLoader
            count={1}
            className='w-xs'
          />
          <div className='flex items-center gap-2'>
            <SkeletonLoader
              count={2}
              className='w-32 mb-0'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <SkeletonLoader
              count={4}
              className='mb-4'
            />
          </div>
          <div>
            <SkeletonLoader
              count={6}
              className='mb-4'
            />
          </div>
        </div>
      </div>
    )

  return (
    <div className='flex gap-6'>
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
      <div className='bg-white-pale rounded-2xl w-full p-6'>
        <FullProfileForm data={data} />
      </div>
    </div>
  )
}
