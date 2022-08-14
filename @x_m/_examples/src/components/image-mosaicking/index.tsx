import React from 'react'
import { useWarnBeforeUnload } from '@x_m/hooks/src'
import styles from './index.module.scss'
import PreviewGroup from './PreviewGroup'
import { useImageMosaickingStore } from './context'

export default function Component() {
  useWarnBeforeUnload()
  const store = useImageMosaickingStore((state) => state)

  return <div className={styles.root}>
    <input
      type='file'
      multiple
      accept='image/*'
      onInput={(e) => {
        const target = e.target as HTMLInputElement
        if (target.files) {
          store.push(...target.files)
        }
      }}
    />
    <div className={styles.previewGroup}>
      <PreviewGroup />
    </div>
  </div>
}
