import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'
import { finalizeResponse } from '@/shared/lib/auth/route-proxy/finalizeResponse'
import { hasUnauthorizedGraphQLError } from '@/shared/lib/auth/route-proxy/hasUnauthorizedGQLError'
import { refreshAuth } from '@/shared/lib/auth/route-proxy/refreshAuth'
import { requestBackendGraphQL } from '@/shared/lib/auth/route-proxy/requestBackendGraphQL'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  const authorization = request.headers.get('authorization') ?? ''
  const userAgent = request.headers.get('user-agent') ?? ''
  const xff = request.headers.get('x-forwarded-for') ?? ''
  const captchaToken = request.headers.get('cf-turnstile-token') ?? ''

  const body = await request.text()

  let refreshSetCookieHeader: string | null = null

  let backendRes = await requestBackendGraphQL({
    body,
    cookie,
    authorization,
    userAgent,
    xff,
    captchaToken
  })

  let text = await backendRes.text()

  const isUnauthorized = backendRes.status === 401 || hasUnauthorizedGraphQLError(text)

  if (isUnauthorized) {
    const refreshRes = await refreshAuth(cookie)

    refreshSetCookieHeader = refreshRes.refreshSetCookieHeader

    if (refreshRes.ok && refreshRes.refreshedCookieHeader) {
      backendRes = await requestBackendGraphQL({
        body,
        cookie: refreshRes.refreshedCookieHeader,
        authorization,
        userAgent,
        xff,
        captchaToken
      })

      text = await backendRes.text()
    }
  }

  if (!backendRes.ok) {
    return finalizeResponse({
      body: text,
      status: backendRes.status,
      refreshSetCookieHeader,
      backendSetCookieHeader: backendRes.headers.get('set-cookie')
    })
  }

  const normalized = normalizeGqlText<any>(text)

  if (!normalized.ok) {
    // Important: keep GraphQL errors in body, but return 200
    // so Apollo treats it as GraphQL error, not network error
    return finalizeResponse({
      body: JSON.stringify(
        normalized.json ?? { errors: [{ message: normalized.message }], data: null }
      ),
      status: 200,
      refreshSetCookieHeader,
      backendSetCookieHeader: backendRes.headers.get('set-cookie')
    })
  }

  return finalizeResponse({
    body: text,
    status: backendRes.status,
    refreshSetCookieHeader,
    backendSetCookieHeader: backendRes.headers.get('set-cookie')
  })
}
