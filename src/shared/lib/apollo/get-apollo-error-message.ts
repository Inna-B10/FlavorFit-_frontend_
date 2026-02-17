import {
  CombinedGraphQLErrors,
  ServerError,
  ServerParseError,
  UnconventionalError
} from '@apollo/client/errors'

export function getApolloErrorMessage(error: unknown): string {
  // 1) GraphQL errors
  if (CombinedGraphQLErrors.is(error)) {
    const first = error.errors[0]
    const originalMsg = first?.extensions?.originalError?.message

    // Nest ValidationPipe: message: string[]
    if (Array.isArray(originalMsg) && originalMsg.length) return String(originalMsg[0])
    // sometime -  message: string
    if (typeof originalMsg === 'string') return originalMsg

    return first?.message || 'Request failed'
  }

  // 2) HTTP errors (if server response != 2xx)
  if (ServerError.is(error)) {
    return `Server error (${error.statusCode})`
  }

  // 3) Server returned a non-JSON (for example, HTML 502 from a proxy)
  if (ServerParseError.is(error)) {
    return 'Server returned an invalid response'
  }

  // 4) Non-standart errors
  if (UnconventionalError.is(error)) {
    return error.message || 'Request failed'
  }

  // 5) fetch / network “Failed to fetch”
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) return 'Server is unavailable'
    return error.message
  }

  return 'Something went wrong'
}
