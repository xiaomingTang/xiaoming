import React from 'react'
import { IconButton } from '@mui/material'
import cln from 'classnames'
import { Delete } from '@mui/icons-material'
import styles from './index.module.scss'

export interface PreviewItemState {
  src: string
  onRemove: () => void
  className?: string
}

type PreviewItemProps = PreviewItemState

export default function PreviewItem({
  src,
  onRemove,
  className,
}: PreviewItemProps) {
  return (
    <div className={cln(className, styles.root)}>
      <img src={src} className={styles.img} />
      <IconButton
        color="primary"
        className={styles.remove}
        onClick={onRemove}
        component='button'
        size='small'
      >
        <Delete fontSize='small' />
      </IconButton>
    </div>
  )
}
