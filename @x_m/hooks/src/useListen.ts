import { useRef, useEffect } from 'react'

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
  const prev = useRef(value)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    callbackRef.current(value, prev.current)
    prev.current = value
  }, [value])
}
