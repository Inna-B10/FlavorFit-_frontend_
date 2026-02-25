import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from '@/features/auth/types/auth.types'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'

export function redirectToLogin(request: NextRequest) {
  const res = NextResponse.redirect(new URL(PUBLIC_PAGES.LOGIN, request.url))
  clearAuthCookies(res)
  return res
}

export function nextWithRefreshedCookies(tokens: {
  isRefreshedToken: true
  setCookie: string | null
}) {
  const res = NextResponse.next()
  applySetCookieHeader(res, tokens.setCookie)
  return res
}

export function redirectWithRefreshedCookies(
  request: NextRequest,
  tokens: { isRefreshedToken: true; setCookie: string | null },
  to: string
) {
  const res = NextResponse.redirect(new URL(to, request.url))
  applySetCookieHeader(res, tokens.setCookie)
  return res
}

function applySetCookieHeader(res: NextResponse, setCookie: string | null) {
  if (!setCookie) return
  //NB multiple cookies can be packed into a single header string. If needed, later must be parsed/splitted properly

  res.headers.set('set-cookie', setCookie)
}

function clearAuthCookies(res: NextResponse) {
  res.cookies.delete(EnumTokens.ACCESS_TOKEN)
  res.cookies.delete(EnumTokens.REFRESH_TOKEN)
}
