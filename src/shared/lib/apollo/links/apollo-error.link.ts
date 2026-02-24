import { CombinedGraphQLErrors, Observable } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { GetNewTokensDocument } from '@/__generated__/graphql'
import { simpleApolloClient } from '../apollo-client'

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) return

  for (const gqlErr of error.errors) {
    if (gqlErr.extensions?.code === 'UNAUTHENTICATED') {
      return new Observable(observer => {
        simpleApolloClient
          .query({
            query: GetNewTokensDocument,
            fetchPolicy: 'no-cache'
          })
          .then(() => {
            forward(operation).subscribe(observer)
          })
          .catch(e => {
            observer.error(e)
          })
      })
    }
  }
  return
})
