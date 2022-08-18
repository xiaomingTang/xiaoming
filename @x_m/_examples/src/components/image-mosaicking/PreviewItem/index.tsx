import React, { useEffect, useRef } from 'react'
import { IconButton } from '@mui/material'
import cln from 'classnames'
import { Delete } from '@mui/icons-material'
import noop from 'lodash/noop'
import styles from './index.module.scss'

export interface PreviewItemState {
  image: HTMLImageElement
  onRemove: () => void
  className?: string
}

type PreviewItemProps = PreviewItemState

export default function PreviewItem({
  image,
  onRemove,
  className,
}: PreviewItemProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (root && image) {
      root.prepend(image)
      return () => {
        root.removeChild(image)
      }
    }
    return noop
  }, [image])

  return (
    <div ref={rootRef} className={cln(className, styles.root)}>
      <IconButton
        color='primary'
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
