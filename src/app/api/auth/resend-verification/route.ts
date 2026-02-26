import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { email } = await request.json()

  const backendRes = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
        mutation ResendVerification($email: String!) {
          resendVerification(email: $email)
        }
      `,
      variables: { email }
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

  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })
}
