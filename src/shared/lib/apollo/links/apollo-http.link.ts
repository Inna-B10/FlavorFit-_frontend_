import { HttpLink } from '@apollo/client'
import { FRONTEND_GRAPHQL_URL } from '@/shared/config/api-config/api.client'

export const httpLink = new HttpLink({
  uri: FRONTEND_GRAPHQL_URL,
  credentials: 'include',
  fetchOptions: {
    cache: 'no-store'
  }
})
