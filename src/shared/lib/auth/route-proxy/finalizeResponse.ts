import { NextResponse } from 'next/server'
import { applyBackendSetCookies } from '../cookies/apply-backend-set-cookies'

export function finalizeResponse({
  body,
  status,
  contentType = 'application/json',
  refreshSetCookieHeader,
  backendSetCookieHeader
}: {
  body: BodyInit | null
  status: number
  contentType?: string
  refreshSetCookieHeader: string | null
  backendSetCookieHeader: string | null
}) {
  const res = new NextResponse(body, {
    status,
    headers: { 'Content-Type': contentType }
  })

  applyBackendSetCookies(res, refreshSetCookieHeader)
  applyBackendSetCookies(res, backendSetCookieHeader)

  return res
}
