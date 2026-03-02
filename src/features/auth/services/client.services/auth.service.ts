import { UserModel } from '@/__generated__/graphql'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }

class AuthService {
  private _AUTH = '/api/auth'

  //* ---------------------------------- Login --------------------------------- */
  async login(email: string, password: string, captchaToken?: string) {
    const res = await fetch(`${this._AUTH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cf-turnstile-token': captchaToken ?? ''
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, captchaToken })
    })

    const json = (await res.json()) as GraphQLResponse<{
      login?: { user?: UserModel }
    }>
    if (!res.ok) {
      const msg = json?.errors?.[0]?.message ?? 'Login failed'
      throw new Error(msg)
    }
    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? 'Login failed')
    }
    return json
  }

  //* --------------------------------- Logout --------------------------------- */
  async logout(): Promise<void> {
    await fetch(`${this._AUTH}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store'
    })
  }

  //* -------------------------------- Refresh --------------------------------- */
  async refresh() {
    const res = await fetch(`${this._AUTH}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store'
    })

    const json = (await res.json()) as GraphQLResponse<{
      newTokens?: { user?: { userId: string } }
    }>

    if (!res.ok) {
      const msg = json?.errors?.[0]?.message ?? 'Refresh tokens failed'
      throw new Error(msg)
    }

    // If GraphQL returns 200 with errors
    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? 'Refresh failed')
    }

    return json
  }

  //* -------------------------------- Registration ---------------------------- */
  async registration(email: string, password: string, firstName: string, captchaToken?: string) {
    const res = await fetch(`${this._AUTH}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cr-turnstile-token': captchaToken ?? ''
      },
      body: JSON.stringify({ email, password, firstName, captchaToken })
    })

    const json = (await res.json()) as GraphQLResponse<{
      register?: { user?: UserModel }
    }>

    if (!res.ok) {
      const msg = json?.errors?.[0]?.message ?? 'Registration failed'
      throw new Error(msg)
    }
    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? 'Registration failed')
    }

    return json
  }

  //* -------------------------------- Verify Email ---------------------------- */
  async verifyEmail(token: string) {
    const res = await fetch(`${this._AUTH}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token })
    })

    const json = (await res.json()) as GraphQLResponse<{ verifyEmail?: { user?: UserModel } }>

    if (!res.ok) {
      const msg = json?.errors?.[0]?.message ?? 'Email verification failed'
      throw new Error(msg)
    }
    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? 'Email verification failed')
    }

    return json
  }
}

export const authService = new AuthService()
