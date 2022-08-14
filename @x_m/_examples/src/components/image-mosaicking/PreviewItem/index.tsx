import React from 'react'
import styles from './index.module.scss'

export interface PreviewItemState {
  src: string
  onRemove: () => void
}

type PreviewItemProps = PreviewItemState

export default function PreviewItem({
  src,
  onRemove,
}: PreviewItemProps) {
  return <div
    className={styles.root}
    onClick={onRemove}
  >
    <img src={src} className={styles.img} />
  </div>
}
