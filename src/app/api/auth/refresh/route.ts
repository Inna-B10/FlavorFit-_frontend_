import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'
import { applyBackendSetCookiesToNextResponse } from '@/shared/lib/server/cookies-actions'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''

  const backendRes = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie
    },
    body: JSON.stringify({
      query: `
        query GetNewTokens {
          newTokens { user { userId } }
        }
      `
    }),
    cache: 'no-store'
  })

  const text = await backendRes.text()

  // Return backend payload (optional for debug/UI)
  const res = new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })

  // Critical: store cookies on frontend/Vercel domain
  applyBackendSetCookiesToNextResponse(res, backendRes.headers.get('set-cookie'))

  return res
}
