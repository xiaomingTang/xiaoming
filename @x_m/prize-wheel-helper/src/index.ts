import { useState, useEffect } from 'react'
import noop from 'lodash/noop'
import type { PrizeWheel } from '@x_m/prize-wheel'

export function usePrizeWheelState(wheel?: PrizeWheel) {
  const [deg, setDeg] = useState(-1)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!wheel) {
      return noop
    }
    const onStart = () => {
      setRunning(true)
    }
    const onRunning = () => {
      setDeg(wheel.deg)
    }
    const onEnd = () => {
      setRunning(false)
    }
    wheel.addListener('start', onStart)
    wheel.addListener('running', onRunning)
    wheel.addListener('end', onEnd)
    return () => {
      wheel.removeListener('start', onStart)
      wheel.removeListener('running', onRunning)
      wheel.removeListener('end', onEnd)
    }
  }, [wheel])

  return {
    deg,
    running,
  }
}
