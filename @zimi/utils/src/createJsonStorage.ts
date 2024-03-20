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
 * It created for Next.js ssr,
 * match server-side rendering with client-side rendering,
 * and apply local stored value a little later.
 *
 * ``` typescript react
 * import { create } from 'zustand'
 *
 * const defaultCounter = {
 *   count: 0,
 *   privateKey: 'This value wont be stored'
 * }
 *
 * const useCounter = createSsrStore(() => defaultCounter, {
 *   name: 'key-of-storage',
 *   storage: createJsonStorage({
 *     partialKeys: ['count'],
 *   })
 * })
 *
 * function App() {
 *   const { count } = useCounter()
 *
 *   const inc = () => {
 *     useCounter.setState((prev) => prev + 1)
 *   }
 *
 *   return <div>
 *     <p> count: {count} </p>
 *     <Button onClick={inc}> inc </Button>
 *   </div>
 * }
 * ```
 *
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
