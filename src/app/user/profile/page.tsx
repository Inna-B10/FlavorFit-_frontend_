import type { Metadata } from 'next'
import { FullProfile } from '@/features/user/ui/FullProfile'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Profile',
  ...NO_INDEX_PAGE
}

export default function ProfilePage() {
  return <FullProfile />
}
