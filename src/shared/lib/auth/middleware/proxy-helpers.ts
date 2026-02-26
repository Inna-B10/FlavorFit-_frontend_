'use server'

import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_PAGES } from '@/shared/config/pages.config'
import { applyBackendSetCookies, clearAuthCookies } from '../cookies/apply-backend-set-cookies'

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
  applyBackendSetCookies(res, tokens.setCookie)
  return res
}

export function redirectWithRefreshedCookies(
  request: NextRequest,
  tokens: { isRefreshedToken: true; setCookie: string | null },
  to: string
) {
  const res = NextResponse.redirect(new URL(to, request.url))
  applyBackendSetCookies(res, tokens.setCookie)
  return res
}
