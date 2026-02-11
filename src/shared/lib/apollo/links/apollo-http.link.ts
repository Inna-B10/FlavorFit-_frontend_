import { GRAPHQL_API_URL } from '@/shared/config/api.config'
import { HttpLink } from '@apollo/client'

export const httpLink = new HttpLink({
	uri: GRAPHQL_API_URL,
	credentials: 'include',
	fetchOptions: {
		next: {
			revalidate: 60
		}
	}
})
