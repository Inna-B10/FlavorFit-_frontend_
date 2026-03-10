import { cookies } from 'next/headers'
import { del } from '@vercel/blob'
import { finalizeResponse } from '@/shared/lib/auth/route-proxy/finalizeResponse'
import { refreshAuth } from '@/shared/lib/auth/route-proxy/refreshAuth'
import { requestBackendGraphQL } from '@/shared/lib/auth/route-proxy/requestBackendGraphQL'

const ME_QUERY = `
  query Me {
    me {
      userId
      avatarUrl
      avatarBlobPath
    }
  }
`

const DELETE_AVATAR_MUTATION = `
  mutation DeleteAvatar {
    deleteAvatar 
  }
`

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const authorization = request.headers.get('authorization') ?? ''
    const userAgent = request.headers.get('user-agent') ?? ''
    const xff = request.headers.get('x-forwarded-for') ?? ''
    const captchaToken = request.headers.get('cf-turnstile-token') ?? ''

    let refreshSetCookieHeader: string | null = null

    async function executeWithCookie(currentCookieHeader: string) {
      const meRes = await requestBackendGraphQL({
        body: JSON.stringify({
          query: ME_QUERY
        }),
        cookie: currentCookieHeader,
        authorization,
        userAgent,
        xff,
        captchaToken
      })

      const meJson = await meRes.json()
      const user = meJson?.data?.me

      if (!meRes.ok || !user?.userId) {
        return {
          ok: false,
          status: meRes.status || 401,
          body: JSON.stringify({ message: 'Unauthorized' })
        }
      }

      if (user.avatarBlobPath) {
        await del(user.avatarBlobPath)
      }

      const deleteRes = await requestBackendGraphQL({
        body: JSON.stringify({
          query: DELETE_AVATAR_MUTATION
        }),
        cookie: currentCookieHeader,
        authorization,
        userAgent,
        xff,
        captchaToken
      })

      const deleteText = await deleteRes.text()
      const deleteJson = JSON.parse(deleteText)

      if (!deleteRes.ok || deleteJson.errors) {
        return {
          ok: false,
          status: deleteRes.status || 500,
          body: JSON.stringify({ message: 'Failed to delete avatar' })
        }
      }

      return {
        ok: true,
        status: 200,
        body: JSON.stringify({
          message: 'Avatar delete successfully',
          user: deleteJson.data.deleteAvatar
        })
      }
    }

    let result = await executeWithCookie(cookieHeader)

    if (!result.ok && result.status === 401) {
      const refresh = await refreshAuth(cookieHeader)
      refreshSetCookieHeader = refresh.refreshSetCookieHeader

      if (refresh.ok && refresh.refreshedCookieHeader) {
        result = await executeWithCookie(refresh.refreshedCookieHeader)
      }
    }

    return finalizeResponse({
      body: result.body,
      status: result.status,
      refreshSetCookieHeader,
      backendSetCookieHeader: null
    })
  } catch {
    return Response.json({ message: 'Avatar delete failed' }, { status: 500 })
  }
}
