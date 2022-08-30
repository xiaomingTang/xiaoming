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

export default function PreviewGroup({ className }: { className?: string }) {
  const store = useImageMosaickingStore()

  return (
    <TransitionGroup className={cln(className, styles.root)}>
      {store.images.map((img, idx) => (
        <CSSTransition key={img.src} timeout={500} classNames={classNames}>
          <PreviewItem
            image={img}
            className={styles.previewItem}
            onRemove={() => {
              store.splice(idx, 1)
            }}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
