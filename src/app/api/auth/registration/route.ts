import { NextResponse } from 'next/server'
import { BACKEND_GRAPHQL_URL } from '@/shared/config/api-config/api.server'
import { normalizeGqlText } from '@/shared/lib/auth/gql-errors-to-html-status'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, firstName, captchaToken } = body as {
    email: string
    password: string
    firstName: string
    captchaToken: string
  }

  //# Send request to backend
  let backendRes: Response

  try {
    backendRes = await fetch(BACKEND_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-turnstile-token': captchaToken ?? '' },
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

  //# Return the same JSON body as backend
  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  })
}
