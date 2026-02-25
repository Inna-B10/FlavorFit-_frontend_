'use server'

import type { NextRequest } from 'next/server'
import { CombinedGraphQLErrors } from '@apollo/client'
import { EnumTokens } from '@/features/auth/types/auth.types'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'

export async function getTokensFromRequest(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  if (!refreshToken) {
    request.cookies.delete(EnumTokens.ACCESS_TOKEN)
    return null
  }

  if (!accessToken) {
    try {
      // const data = await getNewTokensByRefresh(request)

      const refreshResponse = await fetch(GRAPHQL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? ''
        },
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

      // const text = await refreshResponse.text()
      // console.log('refreshResponse body:', text)

      if (!refreshResponse.ok) {
        request.cookies.delete(EnumTokens.REFRESH_TOKEN)
        return null
      }

      const setCookie = refreshResponse.headers.get('set-cookie')

      return {
        isRefreshedToken: true,
        setCookie
      }
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isInvalid = error.errors.some(
          e =>
            e.message === 'Invalid or expired refresh token' ||
            e.extensions?.code === 'UNAUTHENTICATED'
        )
        if (isInvalid) {
          console.log('invalid token')

          request.cookies.delete(EnumTokens.ACCESS_TOKEN)
          request.cookies.delete(EnumTokens.REFRESH_TOKEN)
          return null
        }
      }
      return null
    }
  }

  return { accessToken, refreshToken }
}
