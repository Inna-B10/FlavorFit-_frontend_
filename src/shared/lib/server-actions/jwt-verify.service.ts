'use server'

import * as jose from 'jose'
import type { Role } from '@/__generated__/graphql'

type IAuthTokenData = {
  userId: string
  role: Role
  iat: number
  exp: number
}

export async function jwtVerifyServer(accessToken: string) {
  try {
    const { payload }: { payload: IAuthTokenData } = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(`${process.env.JWT_SECRET_KEY}`)
    )

    return payload
  } catch (error) {
    // handling JWT-verification errors
    if (error instanceof Error && error.message.includes('exp claim timestamp check failed')) {
      // token expired
      console.log('Token expired')
      return null
    }

    console.log('Error verifying token: ', error)
    return null
  }
}
