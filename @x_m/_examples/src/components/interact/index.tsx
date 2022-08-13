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
    // const trigger = triggerElemRef.current
    const trigger = target
    const interact = interactRef.current
    if (!(target && trigger && interact)) {
      return noop
    }
    const onChange = () => {
      target.style.transform = interact.formatToCss()
    }
    const onResize = () => {
      interact.setOriginTranslateFromElement(trigger)
    }
    interact.attach(trigger)
    interact.setOriginTranslateFromElement(trigger)
    interact.addListener('change', onChange)
    window.addEventListener('resize', onResize)
    return () => {
      interact.detach()
      interact.removeListener('change', onChange)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div ref={triggerElemRef} className={styles.trigger} />
      <div ref={targetElemRef} className={styles.target} />
      <p>- 支持鼠标和手指触摸</p>
      <p>- 支持拖拽</p>
      <p>- 支持缩放(鼠标滚轮 或 双指缩合)</p>
      <p>- 支持旋转(shift + 鼠标滚轮 或 双指转动)</p>
    </>
  )
}
