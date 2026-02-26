import { UserModel } from '@/__generated__/graphql'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }

class AuthService {
  private _AUTH = '/api/auth'

  //* ---------------------------------- Login --------------------------------- */
  async login(email: string, password: string) {
    const res = await fetch(`${this._AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
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
  async registration(email: string, password: string, firstName: string) {
    const res = await fetch(`${this._AUTH}/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName })
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

  //* -------------------------------- Resend Verify Email ---------------------------- */
  async resendVerifyEmail(email: string) {
    const res = await fetch(`${this._AUTH}/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include'
    })

    const json = await res.json()

    if (!res.ok) {
      const msg = json?.errors?.[0]?.message ?? 'Resend verify email failed'
      throw new Error(msg)
    }
    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? 'Resend verify email failed')
    }

    return json
  }

  //   async forgotPassword(email: string) {
  //     const res = await fetch(`${this._AUTH}/forgot-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email })
  //     })
  //
  //     const json = (await res.json()) as GraphQLResponse<{ forgotPassword?: { user?: UserModel } }>
  //
  //     if (!res.ok) {
  //       const msg = json?.errors?.[0]?.message ?? 'Forgot password failed'
  //       throw new Error(msg)
  //     }
  //     if (json.errors?.length) {
  //       throw new Error(json.errors[0]?.message ?? 'Forgot password failed')
  //     }
  //
  //     return json
  //   }
  //
  //   async resetPassword(token: string, password: string) {
  //     const res = await fetch(`${this._AUTH}/reset-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token, password })
  //     })
  //
  //     const json = (await res.json()) as GraphQLResponse<{ resetPassword?: { user?: UserModel } }>
  //
  //     if (!res.ok) {
  //       const msg = json?.errors?.[0]?.message ?? 'Reset password failed'
  //       throw new Error(msg)
  //     }
  //     if (json.errors?.length) {
  //       throw new Error(json.errors[0]?.message ?? 'Reset password failed')
  //     }
  //
  //     return json
  //   }
}

export const authService = new AuthService()
