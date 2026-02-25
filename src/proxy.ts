import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_PAGES, USER_PAGES } from './shared/config/pages.config'
import { getNewTokensByRefresh } from './shared/lib/proxy-actions/get-new-tokens-by-refresh'
import { getTokensFromRequest } from './shared/lib/proxy-actions/get-tokens-from-request'
import { jwtVerifyServer } from './shared/lib/proxy-actions/jwt-verify'
import {
  nextWithRefreshedCookies,
  redirectToLogin,
  redirectWithRefreshedCookies
} from './shared/lib/proxy-actions/proxy-helpers'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow auth pages
  if (pathname === PUBLIC_PAGES.LOGIN || pathname === PUBLIC_PAGES.REGISTRATION)
    return NextResponse.next()

  const isUserRoute = pathname.startsWith('/user')
  const isAuthRoute = pathname.startsWith('/auth')

  if (!isUserRoute && !isAuthRoute) return NextResponse.next()

  const tokens = await getTokensFromRequest(request)

  //# protect all routes starting with /user
  if (isUserRoute) {
    if (!tokens) return redirectToLogin(request)

    // Access token was missing but refreshed
    if ('isRefreshedToken' in tokens) {
      return nextWithRefreshedCookies(tokens)
    }

    // Verify existing access token
    const verified = await jwtVerifyServer(tokens.accessToken)

    if (verified.ok) return NextResponse.next()

    // If expired → try refresh
    if (verified.expired) {
      const refreshed = await getNewTokensByRefresh(request)
      if (refreshed) return nextWithRefreshedCookies(refreshed)
    }

    return redirectToLogin(request)
  }

  //# if user is authenticated -> redirect from auth pages to dashboard
  if (isAuthRoute) {
    if (!tokens) return NextResponse.next()

    if ('isRefreshedToken' in tokens) {
      return redirectWithRefreshedCookies(request, tokens, USER_PAGES.DASHBOARD)
    }

    const verified = await jwtVerifyServer(tokens.accessToken)

    if (verified.ok) {
      return NextResponse.redirect(new URL(USER_PAGES.DASHBOARD, request.url))
    }

    if (verified.expired) {
      const refreshed = await getNewTokensByRefresh(request)
      if (refreshed) return redirectWithRefreshedCookies(request, refreshed, USER_PAGES.DASHBOARD)
    }

    // Not authenticated → stay on auth pages
    return NextResponse.next()
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/user/:path*', '/auth/:path*']
}
