import React, { useEffect, useRef, useState } from 'react'
import { MouseFormatter, TouchFormatter } from '@x_m/interact'
import noop from 'lodash/noop'
import { mat3 } from 'gl-matrix'
import type { InteractEvents } from '@x_m/interact'
import styles from './index.module.css'

function geneTransformMatrix(m: mat3) {
  return `matrix(${m[0]},${m[1]},${m[3]},${m[4]},${m[6]},${m[7]})`
}

export default function Component() {
  const matrixRef = useRef(mat3.create())
  const touchRef = useRef(new TouchFormatter())
  const mouseRef = useRef(new MouseFormatter())
  const elemRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  useEffect(() => {
    const elem = elemRef.current
    if (!elem) {
      return noop
    }
    const onMove = (...[pos]: InteractEvents['move']) => {
      mat3.multiply(
        matrixRef.current,
        [1, 0, 0, 0, 1, 0, pos.x, pos.y, 1],
        matrixRef.current
      )
      setTransform(geneTransformMatrix(matrixRef.current))
    }
    const onRotate = (...[{ ratio, center }]: InteractEvents['rotate']) => {
      const cos = Math.cos(ratio)
      const sin = Math.sin(ratio)
      const { x, y } = center
      const a = -x
      const b = -y
      mat3.multiply(
        matrixRef.current,
        [
          cos,
          sin,
          0,
          -sin,
          cos,
          0,
          a * cos - b * sin - a,
          a * sin + b * cos - b,
          1,
        ],
        matrixRef.current
      )
      setTransform(geneTransformMatrix(matrixRef.current))
    }
    const onScale = (...[{ ratio, center }]: InteractEvents['scale']) => {
      mat3.multiply(
        matrixRef.current,
        [
          ratio,
          0,
          0,
          0,
          ratio,
          0,
          center.x * (1 - ratio),
          center.y * (1 - ratio),
          1,
        ],
        matrixRef.current
      )
      setTransform(geneTransformMatrix(matrixRef.current))
    }
    const touch = touchRef.current
    touch.attach(elem)
    touch.addListener('move', onMove)
    touch.addListener('rotate', onRotate)
    touch.addListener('scale', onScale)
    const mouse = mouseRef.current
    mouse.attach(elem)
    mouse.addListener('move', onMove)
    mouse.addListener('rotate', onRotate)
    mouse.addListener('scale', onScale)
    return () => {
      touch.removeListener('move', onMove)
      touch.removeListener('rotate', onRotate)
      touch.removeListener('scale', onScale)
      mouse.removeListener('move', onMove)
      mouse.removeListener('rotate', onRotate)
      mouse.removeListener('scale', onScale)
      touch.detach()
      mouse.detach()
    }
  }, [])

  return (
    <div
      ref={elemRef}
      className={styles.wrapper}
      style={{
        transform,
      }}
    />
  )
}
