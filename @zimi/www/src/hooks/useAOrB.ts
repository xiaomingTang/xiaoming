import { useEffect, useState } from 'react'

export function useAOrB<A, B = A>(a: A, ms: number, b: B): A | B {
  const [status, setStatus] = useState<0 | 1>(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus(1)
    }, ms)

    return () => {
      window.clearTimeout(timer)
    }
  }, [ms])

  return status === 0 ? a : b
}
