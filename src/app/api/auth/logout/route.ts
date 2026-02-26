import { NextResponse } from 'next/server'
import { clearAuthCookies } from '@/shared/lib/server/cookies-actions'

export const runtime = 'nodejs'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  clearAuthCookies(res)
  return res
}
