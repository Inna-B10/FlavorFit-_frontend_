import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_PAGES, USER_PAGES } from './shared/config/pages.config'
import { getTokensFromRequest } from './shared/lib/server-actions/get-tokens-from-request'
import { jwtVerifyServer } from './shared/lib/server-actions/jwt-verify.service'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const tokens = await getTokensFromRequest(request)

  if (pathname === PUBLIC_PAGES.LOGIN || pathname === PUBLIC_PAGES.REGISTRATION)
    return NextResponse.next()

  // protect all routes starting with /user
  if (pathname.includes('/user')) {
    if (!tokens) return NextResponse.redirect(new URL(PUBLIC_PAGES.LOGIN, request.url))

    if ('isRefreshedToken' in tokens) {
      const response = NextResponse.next()

      if (tokens.setCookie) {
        response.headers.set('set-cookie', tokens.setCookie)
      }
      return response
    }
    const verifiedData = await jwtVerifyServer(tokens.accessToken)

    if (!verifiedData) return NextResponse.redirect(new URL(PUBLIC_PAGES.LOGIN, request.url))

    return NextResponse.next()
  }

  // if user has tokens redirect from auth pages to dashboard
  if (pathname.includes('/auth')) {
    if (!tokens) return NextResponse.next()

    if ('isRefreshedToken' in tokens) {
      const response = NextResponse.next()

      if (tokens.setCookie) {
        response.headers.set('set-cookie', tokens.setCookie)
      }
      return response
    }

    const verifiedData = await jwtVerifyServer(tokens.accessToken)

    if (!verifiedData) return NextResponse.next()

    return NextResponse.redirect(new URL(USER_PAGES.DASHBOARD, request.url))
  }

  // return NextResponse.next()
}
export const config = {
  matcher: ['/user/:path*', '/auth/:path*']
}
