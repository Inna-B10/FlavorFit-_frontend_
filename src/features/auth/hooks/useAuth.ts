import { useQuery } from '@apollo/client/react'
import { MeDocument } from '@/__generated__/graphql'

export function useAuth() {
  const { data, loading } = useQuery(MeDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })

  return {
    user: data?.me ?? null,
    isLoading: loading,
    isLoggedIn: !!data?.me
  }
}
