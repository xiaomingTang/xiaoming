import { Box, Button } from '@mui/material'
import React from 'react'
import cln from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'
import { useImageMosaickingStore } from '../context'
import PreviewItem from '../PreviewItem'
import styles from './index.module.scss'

const classNames: CSSTransitionClassNames = {
  appear: styles['previewItem-appear'],
  appearActive: styles['previewItem-appear-active'],
  appearDone: styles['previewItem-appear-done'],
  enter: styles['previewItem-enter'],
  enterActive: styles['previewItem-enter-active'],
  enterDone: styles['previewItem-enter-done'],
  exit: styles['previewItem-exit'],
  exitActive: styles['previewItem-exit-active'],
  exitDone: styles['previewItem-exit-done'],
}

export default function PreviewGroup({
  className,
}: {
  className?: string
}) {
  const store = useImageMosaickingStore()

  return (
    <div className={cln(className, styles.root)}>
      <TransitionGroup className={styles.previewList}>
        <CSSTransition
          key='upload'
          timeout={500}
          classNames={classNames}
        >
          <Box
            sx={{
              display: 'inline-block',
              verticalAlign: 'top',
            }}
            className={styles.previewItem}
          >
            <Button
              sx={{
                width: 100,
                height: 100,
              }}
              variant='contained'
              component="label"
              aria-label="upload picture"
            >
              upload
              <input
                hidden
                type='file'
                multiple
                accept='image/*'
                className={styles.input}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement
                  if (target.files) {
                    store.push(...target.files)
                  }
                }}
              />
            </Button>
          </Box>
        </CSSTransition>
        {store.files.map((item, idx) => (
          <CSSTransition
            key={`${item.name}-${item.size}-${item.lastModified}`}
            timeout={500}
            classNames={classNames}
          >
            <PreviewItem
              src={store.urls[idx]}
              className={styles.previewItem}
              onRemove={() => {
                store.splice(idx, 1)
              }}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}
