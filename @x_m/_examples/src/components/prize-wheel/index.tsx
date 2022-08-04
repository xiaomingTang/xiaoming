import React, { useRef, useState } from 'react'
import { PrizeWheel } from '@x_m/prize-wheel'
import { usePrizeWheelState } from '@x_m/prize-wheel-helper'
import styles from './index.module.css'

export default function Component() {
  const wheelRef = useRef(
    new PrizeWheel({
      minRunningDeg: 2000,
      easeStartDeg: 180,
      easeStopDeg: 360,
      speedRatio: 8,
    })
  )
  const { deg, running } = usePrizeWheelState(wheelRef.current)
  const [shouldStopAtDeg, setShouldStopAtDeg] = useState(0)

  return (
    <div>
      <button
        onClick={() => {
          if (wheelRef.current.running) {
            const tempDeg = Math.floor(Math.random() * 360)
            setShouldStopAtDeg(tempDeg)
            wheelRef.current.shouldStopAt(tempDeg)
          } else {
            setShouldStopAtDeg(0)
            wheelRef.current.run()
          }
        }}
      >
        {running ? 'stop' : 'run'}
      </button>
      <div className={styles.wrapper}>
        <div
          className={styles.curDeg}
          style={{
            transform: `rotate(${deg}deg)`,
          }}
        />
        <div
          className={styles.shouldStopAt}
          style={{
            transform: `rotate(${shouldStopAtDeg}deg)`,
          }}
        />
      </div>
    </div>
  )
}
