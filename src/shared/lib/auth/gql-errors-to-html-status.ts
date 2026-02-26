type GqlError = {
  message?: string
  extensions?: {
    code?: string
    originalError?: { message?: unknown }
  }
}

type GqlResponse<T> = { data?: T; errors?: GqlError[] }

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

export function normalizeGqlText<T>(text: string): {
  ok: boolean
  json: GqlResponse<T> | null
  status: number
  message?: string
} {
  try {
    const json = JSON.parse(text) as GqlResponse<T>
    if (json.errors?.length) {
      return {
        ok: false,
        json,
        status: gqlErrorsToHttpStatus(json.errors),
        message: pickMessage(json.errors[0])
      }
    }
    return { ok: true, json, status: 200 }
  } catch {
    return { ok: false, json: null, status: 502, message: 'Server returned an invalid response' }
  }
}
