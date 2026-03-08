import { buildCookieHeaderFromSetCookie } from '../cookies/apply-backend-set-cookies'

export async function refreshAuth(cookie: string) {
  const refreshRes = await fetch(`${process.env.SITE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie },
    cache: 'no-store'
  })

  const refreshSetCookieHeader = refreshRes.headers.get('set-cookie')
  const refreshedCookieHeader = buildCookieHeaderFromSetCookie(refreshSetCookieHeader)

  return {
    ok: refreshRes.ok,
    refreshSetCookieHeader,
    refreshedCookieHeader
  }
}
