import React from 'react'
import { useWarnBeforeUnload } from '@x_m/hooks/src'
import styles from './index.module.scss'
import PreviewGroup from './PreviewGroup'
import ImageManager from './ImageManager'
import Upload from './Upload'
import Settings from './Settings'
import Export from './Export'

export default function Component() {
  useWarnBeforeUnload()

  return (
    <div className={styles.root}>
      <ImageManager className={styles.imageManager} />
      <div className={styles.footer}>
        <Upload className={styles.upload} />
        <PreviewGroup className={styles.previewGroup} />
      </div>
      <div className={styles.icons}>
        <Export />
        <Settings />
      </div>
    </div>
  )
}
