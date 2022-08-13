import { useEffect, useRef, useState } from 'react'
import noop from 'lodash/noop'

export function useRafLoop<T>(callback: (timestamp: number) => T): T
export function useRafLoop<T>(
  callback: (timestamp: number) => T,
  options: {
    enable?: boolean
  }
): T | undefined
export function useRafLoop<T>(
  callback: (timestamp: number) => T,
  options?: {
    enable?: boolean
  }
) {
  const initialValueRef = useRef(
    !options ? callback(performance.now()) : undefined
  )
  const [result, setResult] = useState<T | undefined>(initialValueRef.current)
  const callbackRef = useRef(callback)
  const enable = options?.enable ?? true

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enable) {
      return noop
    }
    let rafFlag = -1
    const update = (timestamp: number) => {
      if (!enable) {
        return
      }
      setResult(callbackRef.current(timestamp))
      rafFlag = window.requestAnimationFrame(update)
    }

    rafFlag = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(rafFlag)
    }
  }, [enable])

  return result
}
