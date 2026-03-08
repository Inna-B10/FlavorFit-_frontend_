import { cookies } from 'next/headers'
import { finalizeResponse } from '@/shared/lib/auth/route-proxy/finalizeResponse'
import { requestBackendFormData } from '@/shared/lib/auth/route-proxy/media-upload/requestBackendFormData'
import { refreshAuth } from '@/shared/lib/auth/route-proxy/refreshAuth'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const authorization = request.headers.get('authorization') ?? ''
    const userAgent = request.headers.get('user-agent') ?? ''
    const xff = request.headers.get('x-forwarded-for') ?? ''

    const formData = await request.formData()

    let refreshSetCookieHeader: string | null = null

    let backendRes = await requestBackendFormData({
      url: `${process.env.SERVER_URL}/media-upload/avatar`,
      cookie: cookieHeader,
      formData,
      authorization,
      userAgent,
      xff
    })

    let text = await backendRes.text()

    if (backendRes.status === 401) {
      const refresh = await refreshAuth(cookieHeader)

      refreshSetCookieHeader = refresh.refreshSetCookieHeader

      if (refresh.ok && refresh.refreshedCookieHeader) {
        backendRes = await requestBackendFormData({
          url: `${process.env.SERVER_URL}/media-upload/avatar`,
          cookie: refresh.refreshedCookieHeader,
          formData,
          authorization,
          userAgent,
          xff
        })

        text = await backendRes.text()
      }
    }

    return finalizeResponse({
      body: text,
      status: backendRes.status,
      refreshSetCookieHeader,
      backendSetCookieHeader: backendRes.headers.get('set-cookie')
    })
  } catch {
    return Response.json({ message: 'Avatar upload failed' }, { status: 500 })
  }
}
