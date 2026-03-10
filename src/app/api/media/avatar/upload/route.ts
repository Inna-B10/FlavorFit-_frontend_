import { cookies } from 'next/headers'
import { del, put } from '@vercel/blob'
import { finalizeResponse } from '@/shared/lib/auth/route-proxy/finalizeResponse'
import { hasUnauthorizedError } from '@/shared/lib/auth/route-proxy/hasUnauthorizedError'
import { refreshAuth } from '@/shared/lib/auth/route-proxy/refreshAuth'
import { requestBackendGraphQL } from '@/shared/lib/auth/route-proxy/requestBackendGraphQL'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const ME_QUERY = `
  query Me {
    me {
      userId
      avatarUrl
      avatarBlobPath
    }
  }
`

const UPDATE_AVATAR_MUTATION = `
  mutation UpdateAvatar($data: UpdateAvatarInput!) {
    updateAvatar(data: $data) {
      userId
      avatarUrl
      avatarBlobPath
    }
  }
`

function getFileExtension(file: File): 'jpg' | 'jpeg' | 'png' | 'webp' {
  const fileExtension = file.name.split('.').pop()?.toLowerCase()

  if (fileExtension === 'jpg') return 'jpg'
  if (fileExtension === 'jpeg') return 'jpeg'
  if (fileExtension === 'png') return 'png'
  if (fileExtension === 'webp') return 'webp'

  return 'webp'
}

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
    const captchaToken = request.headers.get('cf-turnstile-token') ?? ''

    const formData = await request.formData()
    const fileEntry = formData.get('file')

    if (!(fileEntry instanceof File)) {
      return Response.json({ message: 'File is required' }, { status: 400 })
    }

    const file = fileEntry

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ message: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ message: 'File size must be less than 2MB' }, { status: 400 })
    }

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

      const meText = await meRes.text()
      if (meRes.status === 401 || hasUnauthorizedError(meText)) {
        return {
          ok: false,
          status: 401,
          body: JSON.stringify({ message: 'Unauthorized' })
        }
      }

      const meJson = JSON.parse(meText) as {
        data?: {
          me?: {
            userId: string
            avatarUrl?: string | null
            avatarBlobPath?: string | null
          } | null
        }
      }

      const user = meJson?.data?.me

      if (!meRes.ok || !user?.userId) {
        return {
          ok: false,
          status: meRes.status || 500,
          body: JSON.stringify({ message: 'Failed to get current user' })
        }
      }

      const extension = getFileExtension(file)
      const pathname = `avatars/${user.userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`

      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false,
        contentType: file.type
      })

      const updateRes = await requestBackendGraphQL({
        body: JSON.stringify({
          query: UPDATE_AVATAR_MUTATION,
          variables: {
            data: {
              avatarUrl: blob.url,
              avatarBlobPath: blob.pathname
            }
          }
        }),
        cookie: currentCookieHeader,
        authorization,
        userAgent,
        xff,
        captchaToken
      })

      const updateText = await updateRes.text()
      if (updateRes.status === 401 || hasUnauthorizedError(updateText)) {
        await del(blob.url)

        return {
          ok: false,
          status: 401,
          body: JSON.stringify({ message: 'Unauthorized' })
        }
      }

      const updateJson = JSON.parse(updateText) as {
        data?: {
          updateAvatar?: {
            userId: string
            avatarUrl: string | null
            avatarBlobPath: string | null
          }
        }
        errors?: Array<{ message?: string }>
      }

      if (!updateRes.ok || updateJson.errors || !updateJson.data?.updateAvatar) {
        await del(blob.url)

        return {
          ok: false,
          status: updateRes.status || 500,
          body: JSON.stringify({ message: 'Failed to save avatar' })
        }
      }

      if (user.avatarBlobPath) {
        try {
          await del(user.avatarBlobPath)
        } catch {
          // Ignore old blob deletion errors
        }
      }

      return {
        ok: true,
        status: 200,
        body: JSON.stringify({
          message: 'Avatar uploaded successfully',
          avatarUrl: blob.url,
          avatarBlobPath: blob.pathname,
          user: updateJson.data.updateAvatar
        })
      }
    }

    let result = await executeWithCookie(cookieHeader)

    const isUnauthorized = result.status === 401 || hasUnauthorizedError(result.body)

    if (isUnauthorized) {
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
    return Response.json({ message: 'Avatar upload failed' }, { status: 500 })
  }
}
