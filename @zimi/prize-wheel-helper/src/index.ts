import { useState, useEffect } from 'react'
import noop from 'lodash/noop'
import type { PrizeWheel, PrizeWheelEventsOverview } from '@zimi/prize-wheel'
import type { HandlersOf } from '@zimi/event-emitter'

export function usePrizeWheelState(wheel?: PrizeWheel) {
  const [deg, setDeg] = useState(-1)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!wheel) {
      return noop
    }
    const onEmit: HandlersOf<PrizeWheelEventsOverview>['BUILT_IN_EMIT'] = ({
      type,
    }) => {
      switch (type) {
        case 'start':
          setRunning(true)
          break
        case 'running':
          setDeg(wheel.deg)
          break
        case 'end':
          setRunning(false)
          break
        default:
          break
      }
    }
    wheel.addListener('BUILT_IN_EMIT', onEmit)
    return () => {
      wheel.removeListener('BUILT_IN_EMIT', onEmit)
    }
  }, [wheel])

  return {
    deg,
    running,
  }
}
