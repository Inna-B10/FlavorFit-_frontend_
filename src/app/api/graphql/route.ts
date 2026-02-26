import { NextResponse } from 'next/server'
import { BACKEND_GRAPHQL_URL } from '@/shared/config/api-config/api.server'
import { applyBackendSetCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  const body = await request.text()

  const backendRes = await fetch(BACKEND_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie
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
    return NextResponse.json(normalized.json ?? { errors: [{ message: normalized.message }] }, {
      status: normalized.status
    })
  }

  const res = new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })

  applyBackendSetCookies(res, backendRes.headers.get('set-cookie'))

  return res
}
