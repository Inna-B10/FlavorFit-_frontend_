'use client'

import { useQuery } from '@apollo/client/react'
import { UserRoundPenIcon } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { SkeletonLoader } from '@/shared/components/ui-custom/SkeletonLoader'
import { MeDocument } from '@/__generated__/graphql'
import { AccountForm } from './AccountForm'
import { AvatarUpload } from './AvatarUpload'
import { ChangePasswordForm } from './ChangePasswordForm'
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
      <div className='bg-white-pale rounded-2xl w-full p-4 md:p-6 pb-10'>
        <div className='flex flex-col gap-6 lg:gap-10'>
          <h1 className='text-[clamp(1.5rem,5vw,2rem)] font-semibold font-sansita text-green-dark pl-2'>
            <UserRoundPenIcon className='mr-2 inline lg:size-7 mb-1' />
            Account information
          </h1>
          <div className='flex flex-col md:flex-row gap-10'>
            <div className='flex flex-col gap-10 lg:w-[40%] md:w-1/2 w-full'>
              <AvatarUpload avatarUrl={data.me?.avatarUrl ?? undefined} />
              <AccountForm data={data} />
            </div>
            <div className='flex lg:w-[60%] md:w-1/2 w-full'>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
