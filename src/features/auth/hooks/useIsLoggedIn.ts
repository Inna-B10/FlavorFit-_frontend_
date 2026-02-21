'use client'

import { useSyncExternalStore } from 'react'

const KEY = 'isLoggedIn'
const EVENT = 'auth:changed'

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange()

  // other tabs
  window.addEventListener('storage', handler)
  // same tab (our custom event)
  window.addEventListener(EVENT, handler as EventListener)

  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(EVENT, handler as EventListener)
  }
}

function getSnapshot() {
  return localStorage.getItem(KEY) !== null
}

function getServerSnapshot() {
  // important: keep SSR stable
  return false
}

export function useIsLoggedIn(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Small helpers so you don't forget to emit the event
export function setLoggedInFlag() {
  localStorage.setItem(KEY, '1')
  window.dispatchEvent(new Event(EVENT))
}

export function clearLoggedInFlag() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new Event(EVENT))
}
