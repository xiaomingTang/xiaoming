import React from 'react'
import { useWarnBeforeUnload } from '@x_m/hooks/src'
import styles from './index.module.scss'
import PreviewGroup from './PreviewGroup'

export default function Component() {
  useWarnBeforeUnload()

  return (
    <div className={styles.root}>
      <PreviewGroup className={styles.previewGroup} />
    </div>
  )
}
