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
