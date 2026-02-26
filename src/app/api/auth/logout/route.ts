import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'
import { clearAuthCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''

  await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // forward Vercel-domain cookies to backend so it can read refreshToken
      cookie
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
            mutation Logout {
            logout
          }
        `
    })
  })

  const res = NextResponse.json({ ok: true })
  clearAuthCookies(res)
  return res
}
