type GqlError = {
  message?: string
  extensions?: {
    code?: string
    originalError?: { message?: unknown }
  }
}

type GqlResponse<T> = { data?: T; errors?: GqlError[] }

type NormalizeOptions = {
  status?: number
  contentType?: string
}

function pickMessage(err: GqlError): string {
  const originalMsg = err.extensions?.originalError?.message

  if (Array.isArray(originalMsg) && originalMsg.length) return String(originalMsg[0])
  if (typeof originalMsg === 'string') return originalMsg
  return err.message || 'Request failed'
}

export function gqlErrorsToHttpStatus(errors: GqlError[]): number {
  const code = errors[0]?.extensions?.code

  if (code === 'UNAUTHENTICATED') return 401
  if (code === 'FORBIDDEN') return 403
  return 400
}

export function normalizeGqlText<T>(
  text: string,
  options?: NormalizeOptions
): {
  ok: boolean
  json: GqlResponse<T> | null
  status: number
  message?: string
} {
  const httpStatus = options?.status ?? 200
  const contentType = options?.contentType

  //# Handle unavailable backend
  if ([500, 502, 503, 504].includes(httpStatus)) {
    return {
      ok: false,
      json: null,
      status: 503,
      message: 'Server is unavailable. Please try again later.'
    }
  }

  //# Handle unexpected response format
  if (contentType && !contentType.includes('json')) {
    return {
      ok: false,
      json: null,
      status: 502,
      message: 'Server returned an invalid response.'
    }
  }

  let json: GqlResponse<T>

  try {
    json = JSON.parse(text)
  } catch {
    return {
      ok: false,
      json: null,
      status: 502,
      message: 'Server returned an invalid response.'
    }
  }

  //# Handle GraphQL errors
  if (json.errors?.length) {
    return {
      ok: false,
      json,
      status: ![200, 201, 202, 204].includes(httpStatus)
        ? httpStatus
        : gqlErrorsToHttpStatus(json.errors),
      message: pickMessage(json.errors[0])
    }
  }

  //# Handle HTTP errors without GraphQL errors
  if (![200, 201, 202, 204].includes(httpStatus)) {
    return {
      ok: false,
      json,
      status: httpStatus,
      message: 'Request failed.'
    }
  }

  return { ok: true, json, status: httpStatus }
}
