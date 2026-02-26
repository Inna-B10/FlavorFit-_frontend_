'use server'

import * as jose from 'jose'
import type { Role } from '@/__generated__/graphql'

type IAuthTokenData = {
  userId: string
  role: Role
  iat: number
  exp: number
}
export type JwtVerifyResult =
  | { ok: true; payload: IAuthTokenData }
  | { ok: false; expired: boolean }

export async function jwtVerifyServer(accessToken: string): Promise<JwtVerifyResult> {
  try {
    const { payload }: { payload: IAuthTokenData } = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(String(process.env.JWT_SECRET_KEY))
    )

    return { ok: true, payload }
  } catch (error) {
    const message = error instanceof Error ? error.message : ''

    // Token expired
    if (message.includes('exp claim timestamp check failed')) {
      return { ok: false, expired: true }
    }

    // Invalid signature / malformed token / etc.
    return { ok: false, expired: false }
  }
}
