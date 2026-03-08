import { Metadata } from 'next'
import { Account } from '@/features/user/ui/Account'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Profile',
  ...NO_INDEX_PAGE
}

export default function AccountPage() {
  return <Account />
}
