export type TQuad = 'idle' | 'tl' | 'tr' | 'bl' | 'br'
export type TDelta = { dx: string; dy: string; dr: string; s: number }
export type TDeltaMap = Record<TQuad, TDelta>
