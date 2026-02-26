'use server'

import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { applyBackendSetCookiesToNextResponse, clearAuthCookies } from '../server/cookies-actions'

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
  applyBackendSetCookiesToNextResponse(res, tokens.setCookie)
  return res
}

export function redirectWithRefreshedCookies(
  request: NextRequest,
  tokens: { isRefreshedToken: true; setCookie: string | null },
  to: string
) {
  const res = NextResponse.redirect(new URL(to, request.url))
  applyBackendSetCookiesToNextResponse(res, tokens.setCookie)
  return res
}
