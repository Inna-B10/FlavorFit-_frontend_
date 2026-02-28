import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { httpLink } from './links/apollo-http.link'

export const getApolloClient = () =>
  new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    devtools: {
      enabled: true
    }
  })
