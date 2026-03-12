export function isValidEmail(email: string) {
  const value = email.trim()
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// At least 8 characters, one lowercase, one uppercase, one digit and at least one special character !@#$%^&*
// No spaces or tab characters allowed
export function isValidPassword(password: string) {
  const value = password.trim()
  if (!value) return false
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/.test(value)
}

export function optionalNumberValidation({
  min,
  max,
  integer = true,
  label = 'Value'
}: {
  min?: number
  max?: number
  integer?: boolean
  label?: string
}) {
  return {
    setValueAs: (value: string) =>
      value === '' || value === null || value === undefined ? null : Number(value),
    validate: (value: number | null | undefined) => {
      if (value === null || value === undefined) return true
      if (Number.isNaN(value)) return `${label}: enter a valid number`
      if (integer && !Number.isInteger(value)) return `${label}: enter a whole number`
      if (min !== undefined && value < min) return `${label}: must be at least ${min}`
      if (max !== undefined && value > max) return `${label}: must be at most ${max}`
      return true
    }
  }
}
