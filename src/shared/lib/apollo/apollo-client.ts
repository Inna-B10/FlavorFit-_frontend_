import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import { httpLink } from './links/apollo-http.link'

const removeTypenameLink = new RemoveTypenameFromVariablesLink()
const link = ApolloLink.from([removeTypenameLink, httpLink])

export const getApolloClient = () =>
  new ApolloClient({
    link,
    cache: new InMemoryCache(),
    devtools: {
      enabled: true
    }
  })
