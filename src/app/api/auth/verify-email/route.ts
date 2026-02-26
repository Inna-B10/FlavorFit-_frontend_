import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'
import { applyBackendSetCookies } from '@/shared/lib/auth/cookies/apply-backend-set-cookies'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { token } = await request.json()

  const backendRes = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
        mutation VerifyEmail($token: String!) {
          verifyEmail(token: $token) {
            user {
              userId
              email
              firstName
              role
              avatarUrl
              verificationToken
            }
          }
        }
      `,
      variables: { token }
    })
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
