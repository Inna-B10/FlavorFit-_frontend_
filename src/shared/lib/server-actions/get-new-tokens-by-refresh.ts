'use server'

import { GRAPHQL_API_URL } from '@/shared/config/api.config'

export async function getNewTokensByRefresh(request: Request) {
  const refreshResponse = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: request.headers.get('cookie') ?? ''
    },
    body: JSON.stringify({
      query: `
				query {
					newTokens{
					user {userId}}
					}
				}
			`
    })
  })

  if (!refreshResponse.ok) {
    return null
  }

  const setCookie = refreshResponse.headers.get('set-cookie')

  return {
    isRefreshedToken: true,
    setCookie
  }
}
