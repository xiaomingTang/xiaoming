import React, { useState } from 'react'
import { useRafLoop } from '@x_m/hooks'
import styles from './index.module.scss'

function getTodayStartTime() {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

const todayStartTime = getTodayStartTime()

export default function Component() {
  const [deltaH, setDeltaH] = useState(0)
  const now = useRafLoop(() => Date.now() + deltaH * 1000 * 60 * 60)
  const todaySec = Math.floor((now - todayStartTime) / 1000)

  const h = todaySec / 60 / 60
  const m = todaySec / 60
  const s = todaySec

  return (
    <div className={styles.root}>
      <div className={styles.dial}>
        {new Array(12)
          .fill(0)
          .map((_, i) => i + 1)
          .map((n) => (
            <div key={n} className={styles[`num-${n}`]}>
              {n}
            </div>
          ))}
        <div
          className={styles.hPin}
          style={{
            '--h': h,
          }}
        />
        <div
          className={styles.mPin}
          style={{
            '--m': m,
          }}
        />
        <div
          className={styles.sPin}
          style={{
            '--s': s,
          }}
        />
      </div>
      <button
        className={styles.toggleButton}
        onClick={() => {
          setDeltaH((prev) => prev + 1)
        }}
      >
        加一小时
      </button>
    </div>
  )
}
