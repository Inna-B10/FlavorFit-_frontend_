import { NextRequest } from 'next/server'

export type RefreshedTokensResult = {
  isRefreshedToken: true
  setCookie: string | null
}

export async function getNewTokensByRefresh(request: NextRequest) {
  const refreshUrl = new URL('/api/auth/refresh', request.url)

  try {
    const refreshResponse = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        //NB forward cookies from the incoming request
        cookie: request.headers.get('cookie') ?? ''
      },
      cache: 'no-store'
    })

    if (!refreshResponse.ok) return null

    const setCookie = refreshResponse.headers.get('set-cookie')
    return {
      isRefreshedToken: true as const,
      setCookie
    }
  } catch {
    return null
  }
}
