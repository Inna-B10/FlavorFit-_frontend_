import { NextResponse } from 'next/server'
import { BACKEND_GRAPHQL_URL } from '@/shared/config/api-config/api.server'
import { applyBackendSetCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''

  //# Send request to backend
  let backendRes: Response

  try {
    backendRes = await fetch(BACKEND_GRAPHQL_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // forward Vercel-domain cookies to backend so it can read refreshToken
        cookie
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: `
        query GetNewTokens {
          newTokens { user { userId } }
        }
      `
      })
    })
  } catch {
    return NextResponse.json(
      { errors: [{ message: 'Server is unavailable. Please try again later.' }] },
      { status: 503 }
    )
  }

  //# Normalize backend response
  const text = await backendRes.text()

  const normalized = normalizeGqlText<unknown>(text, {
    status: backendRes.status,
    contentType: backendRes.headers.get('content-type') ?? ''
  })

  if (!normalized.ok) {
    return NextResponse.json(normalized.json ?? { errors: [{ message: normalized.message }] }, {
      status: normalized.status
    })
  }

  //# Return backend response and update cookies
  const res = new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })

  applyBackendSetCookies(res, backendRes.headers.get('set-cookie'))

  return res
}
