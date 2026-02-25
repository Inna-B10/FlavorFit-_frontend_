import type { NextRequest } from 'next/server'
import { EnumTokens } from '@/features/auth/types/auth.types'
import { getNewTokensByRefresh } from './get-new-tokens-by-refresh'

export type TokensResult =
  | { accessToken: string; refreshToken: string }
  | { isRefreshedToken: true; setCookie: string | null }
  | null

export async function getTokensFromRequest(request: NextRequest): Promise<TokensResult> {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  // No refresh token → user is not authenticated
  if (!refreshToken) {
    return null
  }

  // No access token but refresh token exists → try to refresh
  if (!accessToken) {
    return await getNewTokensByRefresh(request)
  }

  return { accessToken, refreshToken }
}
