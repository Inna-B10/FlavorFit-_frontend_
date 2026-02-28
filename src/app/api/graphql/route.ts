import { NextResponse } from 'next/server'
import { applyBackendSetCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  const authorization = request.headers.get('authorization') ?? ''
  const userAgent = request.headers.get('user-agent') ?? ''
  const xff = request.headers.get('x-forwarded-for') ?? ''

  const body = await request.text()

  const backendRes = await fetch(process.env.BACKEND_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie,
      ...(authorization ? { authorization } : {}),
      ...(userAgent ? { 'user-agent': userAgent } : {}),
      ...(xff ? { 'x-forwarded-for': xff } : {})
    },
    body,
    cache: 'no-store'
  })

  const text = await backendRes.text()

  if (!backendRes.ok) {
    return new NextResponse(text, {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const normalized = normalizeGqlText<any>(text)

  if (!normalized.ok) {
    // Important: keep GraphQL errors in body, but return 200
    // so Apollo treats it as GraphQL error, not network error
    return NextResponse.json(
      normalized.json ?? { errors: [{ message: normalized.message }], data: null },
      {
        status: 200
      }
    )
  }

  const res = new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })

  applyBackendSetCookies(res, backendRes.headers.get('set-cookie'))

  return res
}
