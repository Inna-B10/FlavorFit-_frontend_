import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from '@/features/auth/types/auth.types'
import { applyBackendSetCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'
import { getNewTokensByRefresh } from '@/shared/lib/auth/middleware/get-new-tokens-by-refresh'
import { jwtVerifyServer } from '@/shared/lib/auth/middleware/jwt-verify'

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  //# Verify existing access token
  if (accessToken) {
    const verified = await jwtVerifyServer(accessToken)

    if (verified.ok) {
      return NextResponse.json({ status: 'available' })
    }

    // Invalid token → unauthorized
    if (!verified.expired) {
      return NextResponse.json({ status: 'unauthorized' })
    }
  }

  //# No access token or expired access token
  if (!refreshToken) {
    return NextResponse.json({ status: 'unauthorized' })
  }

  //# Try to refresh tokens
  const refreshResult = await getNewTokensByRefresh(request)

  if (refreshResult.status === 'unauthorized') {
    return NextResponse.json({ status: 'unauthorized' })
  }

  if (refreshResult.status === 'unavailable') {
    return NextResponse.json({ status: 'unavailable' }, { status: 503 })
  }

  //# Return updated cookies
  const res = NextResponse.json({ status: 'available' })
  applyBackendSetCookies(res, refreshResult.setCookie)

  return res
}
