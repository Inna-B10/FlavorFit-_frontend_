import { IS_CLIENT } from '@/shared/constants/app.constants'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { httpLink } from './links/apollo-http.link'

//used for refresh token
export const simpleApolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	devtools: {
		enabled: true
	}
})

const clientApolloClient = new ApolloClient({
	link: ApolloLink.from([httpLink]),
	cache: new InMemoryCache(),
	devtools: {
		enabled: true
	}
})

const serverApolloClient = new ApolloClient({
	ssrMode: true,
	link: ApolloLink.from([httpLink]),
	cache: new InMemoryCache(),
	devtools: {
		enabled: true
	},
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache'
		}
	}
})

//link:[], errorLink, httpLink

export function getApolloClient() {
	return IS_CLIENT ? clientApolloClient : serverApolloClient
}
