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
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#a4be7b',
              secondary: '#285430'
            }
          },
          className: 'mt-20 border border-green-dark/50 text-nowrap shadow-lg font-dmMono text-sm'
        }}
      />
    </ApolloProvider>
  )
}
