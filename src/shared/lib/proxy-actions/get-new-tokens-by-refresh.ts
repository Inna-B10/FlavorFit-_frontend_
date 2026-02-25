'use server'

import { NextRequest } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string; extensions?: any }> }

export type RefreshedTokensResult = {
  isRefreshedToken: true
  setCookie: string | null
}

export async function getNewTokensByRefresh(
  request: NextRequest
): Promise<RefreshedTokensResult | null> {
  try {
    const refreshResponse = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //NB forward cookies from the incoming request
        cookie: request.headers.get('cookie') ?? ''
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `
				query GetNewTokens {
					newTokens {
						user { userId }
					}
				}
			`
      })
    })

    // if (isDev()) {
    //   console.log(refreshResponse)
    // }

    // HTTP-level error (400/401/500)
    if (!refreshResponse.ok) return null

    // GraphQL-level error (200 but { errors: [...] })
    const json = (await refreshResponse.json()) as GraphQLResponse<{
      newTokens: { user: { userId: string } }
    }>

    if (json.errors?.length) return null

    const setCookie = refreshResponse.headers.get('set-cookie')
    return {
      isRefreshedToken: true,
      setCookie
    }
  } catch {
    return null
  }
}
