'use server'

import type { NextRequest } from 'next/server'
import { EnumTokens } from '@/features/auth/types/auth.types'
import { getNewTokensByRefresh } from './get-new-tokens-by-refresh'

export type TokensResult =
  | { accessToken: string; refreshToken?: string }
  | { isRefreshedToken: true; setCookie: string | null }
  | { refreshStatus: 'unavailable' }
  | null

export async function getTokensFromRequest(request: NextRequest): Promise<TokensResult> {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  // Access token exists → return tokens
  if (accessToken) {
    return { accessToken, refreshToken }
  }

  // No access token and no refresh token → user is not authenticated
  if (!refreshToken) {
    return null
  }

  // No access token but refresh token exists → try to refresh
  const refreshResult = await getNewTokensByRefresh(request)

  if (refreshResult.status === 'success') {
    return {
      isRefreshedToken: true,
      setCookie: refreshResult.setCookie
    }
  }

  if (refreshResult.status === 'unauthorized') {
    return null
  }

  return { refreshStatus: 'unavailable' }
}
