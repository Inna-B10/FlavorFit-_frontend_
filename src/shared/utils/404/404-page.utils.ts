import { TDelta, TDeltaMap, TQuad } from '@/shared/types/404-page.types'

function hashStringToUnit(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1_000_000) / 1_000_000
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function parsePercent(value: unknown, fallback: number) {
  // "54%" -> 54
  if (typeof value !== 'string') return fallback
  const m = value.trim().match(/^(-?\d*\.?\d+)%$/)
  return m ? Number(m[1]) : fallback
}

function parseCqi(value: unknown, fallback = 42) {
  // "42cqi" -> 42
  if (typeof value !== 'string') return fallback
  const m = value.trim().match(/^(-?\d*\.?\d+)cqi$/i)
  return m ? Number(m[1]) : fallback
}

// proximity to hovered corner: 1 = very close, 0 = far
function proximityToCorner(xPct: number, yPct: number, quad: Exclude<TQuad, 'idle'>) {
  const cx = quad === 'tr' || quad === 'br' ? 100 : 0
  const cy = quad === 'bl' || quad === 'br' ? 100 : 0

  const dx = xPct - cx
  const dy = yPct - cy
  const dist = Math.hypot(dx, dy)

  // max distance in this coordinate system is diagonal of 100x100
  const maxDist = Math.hypot(100, 100) // ~141.42
  const t = 1 - dist / maxDist
  // make falloff steeper so only near-corner pieces move a lot
  return clamp(Math.pow(t, 1), 0, 1)
}

function makeSmartDeltasCqi(seed: string, sizeCqi: number, xPct: number, yPct: number): TDeltaMap {
  const r1 = hashStringToUnit(seed + '|a')
  const r2 = hashStringToUnit(seed + '|b')
  const r3 = hashStringToUnit(seed + '|c')
  const r4 = hashStringToUnit(seed + '|d')

  // size-based baseline: small move more, big move less
  const sizeNorm = clamp(sizeCqi / 42, 0.3, 1)
  const baseAmp = lerp(6.2, 8.2, sizeNorm) * lerp(0.9, 1.15, r1) // in cqi
  const baseRot = lerp(10, 4, sizeNorm) * lerp(0.7, 1.25, r2) // deg
  const baseScale = lerp(1.075, 1.03, sizeNorm) * lerp(0.99, 1.02, r3)

  // tiny asymmetry so it doesn't look robotic
  const skew = lerp(-0.7, 0.7, r4)

  // direction: always away from hovered corner
  const dir: Record<Exclude<TQuad, 'idle'>, { sx: number; sy: number }> = {
    tl: { sx: -1, sy: -1 },
    tr: { sx: 1, sy: -1 },
    bl: { sx: -1, sy: 1 },
    br: { sx: 1, sy: 1 }
  }

  const mk = (quad: Exclude<TQuad, 'idle'>): TDelta => {
    const p = proximityToCorner(xPct, yPct, quad) // 0..1
    // near-corner pieces move much more; far ones barely
    const amp = baseAmp * (0.25 + 1.15 * p)
    const rot = baseRot * (0.15 + 0.85 * p)
    const s = 1 + (baseScale - 1) * (0.25 + 0.75 * p)

    const { sx, sy } = dir[quad]

    // slight swirl: perpendicular component depends on p (gives "organic" motion)
    const swirl = skew * amp * 0.35 * (0.2 + 0.8 * p)

    const dx = amp * sx + swirl * -sy
    const dy = amp * sy + swirl * sx

    // twist sign based on direction, scaled by proximity
    const dr = rot * (sx - sy) * 0.35

    return {
      dx: `${dx}cqi`,
      dy: `${dy}cqi`,
      dr: `${dr}deg`,
      s
    }
  }

  return {
    idle: { dx: '0cqi', dy: '0cqi', dr: '0deg', s: 1 },
    tl: mk('tl'),
    tr: mk('tr'),
    bl: mk('bl'),
    br: mk('br')
  }
}

export function applyAutoDeltasCqiSmart<
  T extends { src: string; size: string; x: string; y: string }
>(items: T[]): (T & { delta: TDeltaMap })[] {
  return items.map((it, idx) => {
    const sizeCqi = parseCqi(it.size, 42)
    const xPct = parsePercent(it.x, 50)
    const yPct = parsePercent(it.y, 50)

    return {
      ...it,
      delta: makeSmartDeltasCqi(`${it.src}|${idx}`, sizeCqi, xPct, yPct)
    }
  })
}
