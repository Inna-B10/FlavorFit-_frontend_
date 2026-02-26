import { UserModel } from '@/__generated__/graphql'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }

class AuthService {
  private _AUTH = '/api/auth'

  async login(email: string, password: string) {
    const res = await fetch(`${this._AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // same-origin cookies are handled automatically; keep default credentials
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

  // export async function logout() {
  //   const res = await fetch(`${this._AUTH}/logout`, { method: 'POST' })
  //   const json = await res.json()
  //   if (!res.ok) throw new Error(json?.message ?? 'Logout failed')
  //   return json
  // }

  // export async function refresh() {
  //   const res = await fetch(`${this._AUTH}/refresh`, { method: 'POST' })
  //   const json = await res.json()
  //   if (!res.ok) throw new Error(json?.message ?? 'Refresh failed')
  //   return json
  // }

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
}

export const authService = new AuthService()
