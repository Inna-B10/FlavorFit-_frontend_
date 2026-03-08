export function hasUnauthorizedGraphQLError(text: string) {
  try {
    const json = JSON.parse(text) as {
      errors?: Array<{ message?: string }>
    }

    return !!json.errors?.some(error => error.message === 'Unauthorized')
  } catch {
    return false
  }
}
