'use client'

import { useMemo } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { Toaster } from 'react-hot-toast'
import { getApolloClient } from '@/shared/lib/apollo/apollo-client'

export function Provider({ children }: { children: React.ReactNode }) {
	const apollo = useMemo(() => getApolloClient(), [])

	return (
		<ApolloProvider client={apollo}>
			{children}
			<Toaster
				position='top-center'
				// toastOptions={{
				// 	style: {
				// 		backgroundColor: '#3f3f46',
				// 		// backgroundColor: '#202937',
				// 		color: 'white'
				// 	},
				// 	className: 'border border-white/20 text-nowrap shadow-lg'
				// }}
			/>
		</ApolloProvider>
	)
}
