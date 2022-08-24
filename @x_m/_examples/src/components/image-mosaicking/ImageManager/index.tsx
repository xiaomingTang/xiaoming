import React, { useEffect, useRef } from 'react'
import cln from 'classnames'
import noop from 'lodash/noop'
import { useElementRect } from '@x_m/hooks'
import styles from './index.module.scss'
import { useImageMosaickingStore } from '../context'

export default function ImageManager({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { images } = useImageMosaickingStore()
  const rect = useElementRect(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      images.forEach((image, idx) => {
        ctx?.drawImage(image, idx * 100, idx * 100, 100, 100)
      })

      return () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    return noop
  }, [images, rect])

  return (
    <canvas
      ref={canvasRef}
      width={rect.width}
      height={rect.height}
      className={cln(className, styles.root)}
    />
  )
}
