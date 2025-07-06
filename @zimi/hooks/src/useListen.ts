import { useRef } from 'react'

import { useMuiEnhancedEffect } from './useMuiEnhancedEffect'
import { useMuiEventCallback } from './useMuiEventCallback'

function defaultEq<T>(next: T | undefined, prev: T | undefined): boolean {
  return Object.is(next, prev)
}

/**
 * @example
 * ``` tsx
 * function Component() {
 *   const [count, setCount] = useState(0)
 *
 *   // will be triggered when count changed
 *   useListen(count, (prev, next) => {
 *     console.log(prev, next)
 *   })
 *
 *   // custom equality function
 *   useListen(count, shallowEqual, (prev, next) => {
 *     console.log(prev, next)
 *   })
 * }
 * ```
 */
export function useListen<T>(
  value: T,
  eq: (next: T | undefined, prev: T | undefined) => boolean,
  callback: (next: T, prev: T | undefined) => void
): void
export function useListen<T>(
  value: T,
  callback: (next: T, prev: T | undefined) => void
): void
export function useListen<T>(
  value: T,
  funcA: (next: T | undefined, prev: T | undefined) => boolean | void,
  funcB?: (next: T | undefined, prev: T | undefined) => boolean | void
) {
  const eq = useMuiEventCallback((next: T | undefined, prev: T | undefined) => {
    const eqFunc = typeof funcB === 'function' ? funcA : defaultEq
    return eqFunc(next, prev)
  })
  const isFirstCallbackRef = useRef(true)
  const prevRef = useRef<T | undefined>(undefined)
  const callbackRef = useMuiEventCallback(
    typeof funcB === 'function' ? funcB : funcA
  )

  useMuiEnhancedEffect(() => {
    // useEffect 在 dev 环境会执行 2 遍, 此处避免该行为造成的影响
    if (eq(value, prevRef.current) && !isFirstCallbackRef.current) {
      return
    }
    isFirstCallbackRef.current = false
    callbackRef(value, prevRef.current)
    prevRef.current = value
  }, [value, callbackRef, eq])
}
