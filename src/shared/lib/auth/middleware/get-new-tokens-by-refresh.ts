import { NextRequest } from 'next/server'

export type RefreshResult =
  | { status: 'success'; setCookie: string | null }
  | { status: 'unauthorized' }
  | { status: 'unavailable' }

export async function getNewTokensByRefresh(request: NextRequest): Promise<RefreshResult> {
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

    if (refreshResponse.status === 401 || refreshResponse.status === 403) {
      return { status: 'unauthorized' }
    }

    if (!refreshResponse.ok) {
      return { status: 'unavailable' }
    }

    const setCookie = refreshResponse.headers.get('set-cookie')

    return {
      status: 'success',
      setCookie
    }
  } catch {
    return { status: 'unavailable' }
  }
}
