import { useRef } from 'react'

import { useMuiEnhancedEffect } from './useMuiEnhancedEffect'
import { useMuiEventCallback } from './useMuiEventCallback'

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
 * }
 * ```
 */
export function useListen<T>(
  value: T,
  callback: (next: T, prev: T | undefined) => void
) {
  const isFirstCallbackRef = useRef(true)
  const prevRef = useRef<T | undefined>(undefined)
  const callbackRef = useMuiEventCallback(callback)

  useMuiEnhancedEffect(() => {
    // useEffect 在 dev 环境会执行 2 遍, 此处避免该行为造成的影响
    if (value === prevRef.current && !isFirstCallbackRef.current) {
      return
    }
    isFirstCallbackRef.current = false
    callbackRef(value, prevRef.current)
    prevRef.current = value
  }, [value, callbackRef])
}
