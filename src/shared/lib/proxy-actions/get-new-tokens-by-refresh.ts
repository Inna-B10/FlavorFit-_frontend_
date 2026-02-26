import { NextRequest } from 'next/server'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string; extensions?: any }> }

export type RefreshedTokensResult = {
  isRefreshedToken: true
  setCookie: string | null
}

export async function getNewTokensByRefresh(
  request: NextRequest
): Promise<RefreshedTokensResult | null> {
  const refreshUrl = new URL('/api/auth/refresh', request.url)

  try {
    const refreshResponse = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        //NB forward cookies from the incoming request
        cookie: request.headers.get('cookie') ?? ''
      },
      credentials: 'include',
      cache: 'no-store'
    })

    // if (isDev()) {
    //   console.log(refreshResponse)
    // }

    // HTTP-level error (400/401/500)
    if (!refreshResponse.ok) return null

    // GraphQL-level error (200 but { errors: [...] })
    const json = (await refreshResponse.json()) as GraphQLResponse<{
      newTokens: { user: { userId: string } }
    }>

    if (json.errors?.length) return null

    const setCookie = refreshResponse.headers.get('set-cookie')
    return {
      isRefreshedToken: true,
      setCookie
    }
  } catch {
    return null
  }
}
