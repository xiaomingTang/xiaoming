interface StaticFuncs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => any
}

/**
 * ```tsx
 * import { create } from 'zustand'
 *
 * const useRawCounter = create(() => ({
 *   count: 0,
 * }))
 *
 * const useCounter = withStatic(useRawCounter, {
 *   inc() {
 *     useRawCounter.setState((prev) => prev + 1),
 *   },
 *   dec() {
 *     useRawCounter.setState((prev) => prev - 1),
 *   },
 * })
 *
 * function App() {
 *   const { count } = useCounter()
 *
 *   return <div>
 *     <Button onClick={useCounter.inc}> inc </Button>
 *     <p> count: {count} </p>
 *     <Button onClick={useCounter.dec}> dec </Button>
 *   </div>
 * }
 * ```
 */
export function withStatic<T extends object, S extends StaticFuncs>(
  useStore: T,
  staticFuncs: S
) {
  const isDev = process.env.NODE_ENV === 'development'
  const result = useStore as T & S
  Object.keys(staticFuncs).forEach((key) => {
    if (key in useStore) {
      if (isDev) {
        throw new Error(`protected key: "${key}"`)
      } else {
        console.error(`protected key: "${key}"`)
      }
      return
    }
    // @ts-expect-error 将 staticFuncs key 赋给 result
    result[key] = staticFuncs[key]
  })
  return result
}
