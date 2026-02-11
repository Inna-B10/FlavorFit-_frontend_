'use client'

import { getApolloClient } from '@/shared/lib/apollo/apollo-client'
import { ApolloProvider } from '@apollo/client/react'

export function Provider({ children }: { children: React.ReactNode }) {
	const apollo = getApolloClient()

	return <ApolloProvider client={apollo}>{children}</ApolloProvider>
}
