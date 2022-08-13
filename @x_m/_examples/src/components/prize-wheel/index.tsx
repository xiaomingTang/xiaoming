import React, { useRef, useState } from 'react'
import { PrizeWheel } from '@x_m/prize-wheel'
import { usePrizeWheelState } from '@x_m/prize-wheel-helper'
import styles from './index.module.scss'

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
  const [willStopAtDeg, setWillStopAtDeg] = useState(0)

  return (
    <div className={styles.root}>
      <div className={styles.wheelWrapper}>
        <div
          className={styles.curDeg}
          style={{
            transform: `rotate(${deg}deg)`,
          }}
        />
        <div
          className={styles.shouldStopAt}
          style={{
            transform: `rotate(${willStopAtDeg}deg)`,
          }}
        />
      </div>
      <button
        className={styles.trigger}
        onClick={() => {
          if (wheelRef.current.running) {
            const tempDeg = Math.floor(Math.random() * 360)
            wheelRef.current.shouldStopAt(tempDeg)
            setWillStopAtDeg(tempDeg)
          } else {
            setWillStopAtDeg(0)
            wheelRef.current.run()
          }
        }}
      >
        {running ? 'stop' : 'run'}
      </button>
      <p>首次按下 run, 将会启动该抽奖转盘</p>
      <p>
        每次按下 stop, 都将随机生成一个角度,
        转盘会尽快以尽可能自然的姿态停到该角度
      </p>
      <p>
        本转盘已设置最小转动圈数为 5 圈半(也就是说, 即使你按下 run 之后立马按下
        stop, 仍将会转 5.5 圈以上才会停到相应位置)
      </p>
    </div>
  )
}
