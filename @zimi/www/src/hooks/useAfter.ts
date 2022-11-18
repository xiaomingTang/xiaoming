import { useEffect, useRef } from 'react'

export default function useAfter(
  ms: number,
  callback: () => void | Promise<void>
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const timer = window.setTimeout(() => {
      callbackRef.current()
    }, ms)

    return () => {
      window.clearTimeout(timer)
    }
  }, [ms])
}
