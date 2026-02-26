import { NextResponse } from 'next/server'
import { BACKEND_GRAPHQL_URL } from '@/shared/config/api-config/api.server'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, firstName } = body as {
    email: string
    password: string
    firstName: string
  }

  const backendRes = await fetch(BACKEND_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
        mutation Register($data: RegisterInput!) {
          register(data: $data) {
            user {
              avatarUrl
              email
              firstName
              userId
              role
              verificationToken
            }
          }
        }
      `,
      variables: { data: { email, password, firstName } }
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

  return res
}
