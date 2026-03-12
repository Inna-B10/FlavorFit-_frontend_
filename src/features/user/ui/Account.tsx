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
    <div className='flex gap-6 w-full grow'>
      <UserSidebar user={user} />
      <div className='bg-white-pale rounded-2xl w-full p-4 md:p-6'>
        <AccountForm data={data} />
      </div>
    </div>
  )
}
