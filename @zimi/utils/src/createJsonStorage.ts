import { pick } from 'lodash-es'

import type { Or } from '@zimi/type-utils'

export interface DecodedStorage<T> {
  getItem: (name: string) => T | null
  setItem: (name: string, value: T | null) => void
  removeItem: (name: string) => void
}

type Options<T> =
  | {
      serialize: (state: T | null) => string
      deserialize?: (s: string) => T | null
    }
  | {
      partialKeys: (keyof T)[]
    }

// 为了下面编码方便而构造的一个类型
type SimpleOptions<T> = Or<
  {
    serialize: (state: T | null) => string
    deserialize?: (s: string) => T | null
  },
  {
    partialKeys: (keyof T)[]
  }
>

/**
 * @param storage @default window.localStorage
 */
export function createJsonStorage<T, P extends Partial<T> = T>(
  options?: Options<P>,
  storage?: DecodedStorage<string>
): DecodedStorage<P> {
  const simpleOptions = options as SimpleOptions<T>
  const parse = simpleOptions?.deserialize ?? JSON.parse
  const stringify = simpleOptions?.serialize ?? JSON.stringify
  return {
    getItem(name) {
      try {
        return (
          (parse((storage ?? window.localStorage).getItem(name) ?? '') as P) ||
          null
        )
      } catch (error) {
        return null
      }
    },
    setItem(name, value) {
      let storedValue: P | null = value
      if (simpleOptions?.partialKeys) {
        storedValue = pick(value, simpleOptions.partialKeys) as P
      }
      ;(storage ?? window.localStorage).setItem(name, stringify(storedValue))
    },
    removeItem(name) {
      ;(storage ?? window.localStorage).removeItem(name)
    },
  }
}
