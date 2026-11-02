import { NextRequest, NextResponse } from 'next/server'
import { USER_PAGES } from './shared/config/pages.config'
import { getNewTokensByRefresh } from './shared/lib/auth/middleware/get-new-tokens-by-refresh'
import { getTokensFromRequest } from './shared/lib/auth/middleware/get-tokens-from-request'
import { jwtVerifyServer } from './shared/lib/auth/middleware/jwt-verify'
import {
  nextWithRefreshedCookies,
  redirectToLogin,
  redirectWithRefreshedCookies
} from './shared/lib/auth/middleware/proxy-helpers'

function nextWithAuthStatus(request: NextRequest, status: 'unavailable') {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-auth-status', status)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isUserRoute = pathname.startsWith('/user')
  const isAuthRoute = pathname.startsWith('/auth')

  if (!isUserRoute && !isAuthRoute) return NextResponse.next()

  const tokens = await getTokensFromRequest(request)

  //# protect all routes starting with /user
  if (isUserRoute) {
    if (!tokens) return redirectToLogin(request)

    if ('refreshStatus' in tokens) {
      return nextWithAuthStatus(request, 'unavailable')
    }

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

      if (refreshed.status === 'success') {
        return nextWithRefreshedCookies({
          isRefreshedToken: true,
          setCookie: refreshed.setCookie
        })
      }

      if (refreshed.status === 'unavailable') {
        return nextWithAuthStatus(request, 'unavailable')
      }
    }

    return redirectToLogin(request)
  }

  //# if user is authenticated -> redirect from auth pages to dashboard
  if (isAuthRoute) {
    if (!tokens) return NextResponse.next()

    if ('refreshStatus' in tokens) {
      return NextResponse.next()
    }

    if ('isRefreshedToken' in tokens) {
      return redirectWithRefreshedCookies(request, tokens, USER_PAGES.DASHBOARD)
    }

    const verified = await jwtVerifyServer(tokens.accessToken)

    if (verified.ok) {
      return NextResponse.redirect(new URL(USER_PAGES.DASHBOARD, request.url))
    }

    if (verified.expired) {
      const refreshed = await getNewTokensByRefresh(request)

      if (refreshed.status === 'success') {
        return redirectWithRefreshedCookies(
          request,
          {
            isRefreshedToken: true,
            setCookie: refreshed.setCookie
          },
          USER_PAGES.DASHBOARD
        )
      }
    }

    // Not authenticated → stay on auth pages
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/auth/:path*']
}
