import React, { useEffect, useRef } from 'react'
import noop from 'lodash/noop'
import InteractDom from '@x_m/interact-dom'
import styles from './index.module.css'

export default function Component() {
  const interactRef = useRef(new InteractDom())
  const targetElemRef = useRef<HTMLDivElement>(null)
  const triggerElemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetElemRef.current
    const trigger = triggerElemRef.current
    const interact = interactRef.current
    if (!(target && trigger && interact)) {
      return noop
    }
    const onChange = () => {
      target.style.transform = interact.formatToCss()
    }
    interact.attach(trigger)
    interact.setOriginTranslateFromElement(trigger)
    interact.addListener('change', onChange)
    return () => {
      interact.detach()
      interact.removeListener('change', onChange)
    }
  }, [])

  return (
    <>
      <div ref={triggerElemRef} className={styles.trigger} />
      <div ref={targetElemRef} className={styles.target} />
    </>
  )
}
