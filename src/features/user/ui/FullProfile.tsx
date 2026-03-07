'use client'

import { useQuery } from '@apollo/client/react'
import { SkeletonLoader } from '@/shared/components/ui-custom/SkeletonLoader'
import { GetFullProfileDocument } from '@/__generated__/graphql'
import { FullProfileForm } from './FullProfileForm'

export function FullProfile() {
  const { data, loading } = useQuery(GetFullProfileDocument)

  if (loading || !data?.fullProfile)
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

  return <FullProfileForm data={data} />
}
