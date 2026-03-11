'use client'

import { useQuery } from '@apollo/client/react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { SkeletonLoader } from '@/shared/components/ui-custom/SkeletonLoader'
import { MeDocument } from '@/__generated__/graphql'
import { AccountForm } from './AccountForm'
import { UserSidebar } from './UserSidebar'

export function Account() {
  const { data, loading } = useQuery(MeDocument)
  const { user, isLoading } = useAuth()

  if (loading || !data?.me || isLoading || !user)
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
    <div className='flex gap-6 w-full'>
      <UserSidebar user={user} />
      <div className='bg-white-pale rounded-2xl w-full p-4 md:p-6'>
        <AccountForm data={data} />
      </div>
    </div>
  )
}
