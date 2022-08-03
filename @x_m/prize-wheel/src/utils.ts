import { useState, useEffect } from 'react'
import { clamp, noop } from 'lodash-es'
import type { PrizeWheelLogic } from './logic'

/**
 * 缓动函数
 * https://aaron-bird.github.io/2019/03/30/%E7%BC%93%E5%8A%A8%E5%87%BD%E6%95%B0(easing%20function)/
 */
export function easeInOutQuad({
  currentTime,
  targetTime,
  startValue,
  endValue,
}: {
  currentTime: number
  targetTime: number
  startValue: number
  endValue: number
}) {
  // 归一化 到 0 - 2
  let normalCurrentTime = clamp(currentTime / (targetTime / 2), 0, 2)
  const deltaValue = endValue - startValue
  if (normalCurrentTime < 1) {
    return startValue + (deltaValue / 2) * normalCurrentTime * normalCurrentTime
  }
  normalCurrentTime -= 1
  return (
    startValue -
    (deltaValue / 2) * (normalCurrentTime * (normalCurrentTime - 2) - 1)
  )
}

export function usePrizeWheelState(wheel?: PrizeWheelLogic) {
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
