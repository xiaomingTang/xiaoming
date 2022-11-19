import type { WindowSize } from '@/hooks/useWindowSize'

export interface WebStorageMap {
  AUTHORIZATION: string
  WINDOW_SIZE: WindowSize
}

export type WebStorageKey = keyof WebStorageMap

export class WebStorage {
  static get(key: WebStorageKey): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null
  }

  static set(key: WebStorageKey, value: string | null): void {
    if (value === null) {
      WebStorage.remove(key)
    } else {
      localStorage.setItem(key, value)
    }
  }

  static remove(key: WebStorageKey): void {
    localStorage.removeItem(key)
  }

  static clear(): void {
    localStorage.clear()
  }

  static getAndParse<S extends WebStorageKey>(key: S): WebStorageMap[S] | null {
    try {
      const value = WebStorage.get(key)
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
    } catch (err) {
      // pass
    }
    return null
  }

  static setAndStringify<S extends WebStorageKey>(
    key: S,
    value: WebStorageMap[S] | null
  ) {
    if (value === null) {
      WebStorage.remove(key)
    } else {
      WebStorage.set(key, JSON.stringify(value))
    }
  }
}
