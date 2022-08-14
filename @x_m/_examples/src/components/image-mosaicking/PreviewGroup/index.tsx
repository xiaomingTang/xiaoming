import React from 'react'
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

export default function PreviewGroup() {
  const store = useImageMosaickingStore()

  return <div className={styles.root}>
    <TransitionGroup className={styles.previewList}>
      {
        store.files.map((item, idx) => (
          <CSSTransition
            key={`${item.name}-${item.size}-${item.lastModified}`}
            timeout={500}
            classNames={classNames}
          >
            <PreviewItem
              src={store.urls[idx]}
              onRemove={() => {
                store.splice(idx, 1)
              }}
            />
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  </div>
}
