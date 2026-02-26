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
//link:[], errorLink, httpLink

// export function getApolloClient() {
//   if (!IS_CLIENT) {
//     throw new Error('Apollo client is intended for client-side usage only in this project.')
//   }
//   return clientApolloClient
// }

// const serverApolloClient = new ApolloClient({
//   ssrMode: true,
//   link: ApolloLink.from([httpLink]),
//   cache: new InMemoryCache(),
//   devtools: {
//     enabled: true
//   },
//   defaultOptions: {
//     query: {
//       fetchPolicy: 'no-cache'
//     }
//   }
// })
//
//
// export function getApolloClient() {
//   return IS_CLIENT ? clientApolloClient : serverApolloClient
// }
