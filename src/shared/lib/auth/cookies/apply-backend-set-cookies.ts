import type { NextResponse } from 'next/server'
import { EnumTokens } from '@/features/auth/types/auth.types'

type SameSite = 'lax' | 'strict' | 'none'

function splitSetCookieHeader(header: string): string[] {
  // Splits "a=...; Expires=Wed, 25 Feb 2026 ... , b=...; Expires=Sat, 28 Feb 2026 ..."
  // without breaking on Expires commas.
  const parts: string[] = []
  let start = 0
  let inExpires = false

  for (let i = 0; i < header.length; i++) {
    const ch = header[i]

    if (!inExpires && header.slice(i, i + 8).toLowerCase() === 'expires=') {
      inExpires = true
      continue
    }

    if (inExpires && ch === ';') {
      inExpires = false
      continue
    }

    if (!inExpires && ch === ',') {
      const chunk = header.slice(start, i).trim()
      if (chunk) parts.push(chunk)
      start = i + 1
    }
  }

  const last = header.slice(start).trim()
  if (last) parts.push(last)

  return parts
}

function parseCookieString(cookieStr: string): {
  name: string
  value: string
  options: {
    path?: string
    expires?: Date
    httpOnly?: boolean
    secure?: boolean
    sameSite?: SameSite
    maxAge?: number
  }
} | null {
  const segments = cookieStr.split(';').map(s => s.trim())
  const [nameValue, ...attrs] = segments
  const eq = nameValue.indexOf('=')
  if (eq === -1) return null

  const name = nameValue.slice(0, eq).trim()
  const value = nameValue.slice(eq + 1)

  const options: any = {}

  for (const a of attrs) {
    const [kRaw, vRaw] = a.split('=')
    const k = kRaw.trim().toLowerCase()
    const v = (vRaw ?? '').trim()

    if (k === 'path') options.path = v
    else if (k === 'expires') options.expires = new Date(v)
    else if (k === 'max-age') options.maxAge = Number(v)
    else if (k === 'httponly') options.httpOnly = true
    else if (k === 'secure') options.secure = true
    else if (k === 'samesite') options.sameSite = v.toLowerCase()
  }

  return { name, value, options }
}

export function applyBackendSetCookies(res: NextResponse, backendSetCookieHeader: string | null) {
  if (!backendSetCookieHeader) return

  const cookies = splitSetCookieHeader(backendSetCookieHeader)

  for (const c of cookies) {
    const parsed = parseCookieString(c)
    if (!parsed) continue
    res.cookies.set(parsed.name, parsed.value, parsed.options)
  }
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.delete(EnumTokens.ACCESS_TOKEN)
  res.cookies.delete(EnumTokens.REFRESH_TOKEN)
}
