import { ApolloClient } from '@apollo/client'
import { LogoutDocument } from '@/__generated__/graphql'

export async function logoutRequest(apolloClient: ApolloClient): Promise<void> {
  await apolloClient.mutate({ mutation: LogoutDocument, fetchPolicy: 'no-cache' })

  await apolloClient.clearStore()
}
