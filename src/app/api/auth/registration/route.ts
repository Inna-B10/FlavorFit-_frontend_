import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/config/api.config'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, firstName } = body as {
    email: string
    password: string
    firstName: string
  }

  const backendRes = await fetch(GRAPHQL_API_URL, {
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

  const res = new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })

  // Critical: move backend cookies onto the Vercel domain
  // applyBackendSetCookiesToNextResponse(res, backendRes.headers.get('set-cookie'))

  return res
}
