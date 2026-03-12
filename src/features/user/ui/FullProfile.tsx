'use client'

import { useQuery } from '@apollo/client/react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { SkeletonLoader } from '@/shared/components/ui-custom/SkeletonLoader'
import { GetFullProfileDocument } from '@/__generated__/graphql'
import { FullProfileForm } from './FullProfileForm'
import { UserSidebar } from './UserSidebar'

export function FullProfile() {
  const { data, loading } = useQuery(GetFullProfileDocument)
  const { user, isLoading } = useAuth()

  if (loading || !data?.fullProfile || isLoading || !user)
    return (
      <div className='flex grow'>
        <div className='flex grow'>
          <div className='w-full'>
            <SkeletonLoader
              count={1}
              className='h-full'
            />
          </div>
        </div>
      </div>
    )

  return (
    <div className='flex gap-6 grow'>
      <UserSidebar user={user} />
      <div className='bg-white-pale rounded-2xl w-full p-6'>
        <FullProfileForm data={data} />
      </div>
    </div>
  )
}
