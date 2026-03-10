export function hasUnauthorizedError(text: string) {
  try {
    const json = JSON.parse(text) as {
      message?: string
      statusCode?: number
      errors?: Array<{ message?: string }>
    }

    const hasGraphQLError = !!json.errors?.some(error => error.message === 'Unauthorized')
    const hasRestError = json.message === 'Unauthorized' || json.statusCode === 401

    return hasGraphQLError || hasRestError
  } catch {
    return false
  }
}
