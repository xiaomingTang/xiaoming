import { useCallback, useEffect, useRef } from 'react'

interface Position {
  clientX: number
  clientY: number
}

interface ExactClickProps {
  /**
   * x/y 方向移动超过该值则认为不是 click;
   *
   * 负数 表示不考量该参数;
   *
   * @default 10
   */
  eps?: number
  /**
   * 点击时间间隔超过该值则认为不是 click;
   *
   * 负数 表示不考量该参数;
   *
   * @default 500
   */
  durationMs?: number
  /**
   * 是否允许移动后回到原处并触发 click;
   *
   * @default false
   */
  enableMoveAndBack?: boolean
}

function isOutOfBounds(posA: Position, posB: Position, eps: number) {
  return (
    Math.abs(posA.clientX - posB.clientX) > eps ||
    Math.abs(posA.clientY - posB.clientY) > eps
  )
}

/**
 * @example
 * ``` typescript
 * function Test() {
 *   const {
 *     onPointerDown, checkExactClick,
 *   } = useExactClick()
 *
 *   return <div
 *     onPointerDown={onPointerDown}
 *     onClick={(e) => {
 *       if (checkExactClick(e)) {
 *         // do something
 *       }
 *     }}
 *   >
 *     hello
 *   </div>
 * }
 * ```
 */
export function useExactClick({
  eps = 10,
  durationMs = 500,
  enableMoveAndBack = false,
}: ExactClickProps = {}) {
  const startPosRef = useRef<Position>({
    clientX: 0,
    clientY: 0,
  })
  const startTimeRef = useRef(0)
  const isMoveAndBackRef = useRef(false)

  const onPointerDown = useCallback((e: Position) => {
    startPosRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
    }
    startTimeRef.current = Date.now()
    isMoveAndBackRef.current = false
  }, [])

  useEffect(() => {
    if (enableMoveAndBack || eps < 0) {
      return () => {
        // pass
      }
    }
    const onWindowPointerMove = (e: Position) => {
      if (isOutOfBounds(startPosRef.current, e, eps)) {
        isMoveAndBackRef.current = true
      }
    }
    window.addEventListener('pointermove', onWindowPointerMove)

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove)
    }
  }, [eps, enableMoveAndBack])

  const checkExactClick = useCallback(
    (e: Position) => {
      if (durationMs >= 0 && Date.now() - startTimeRef.current > durationMs) {
        return false
      }
      if (!enableMoveAndBack && isMoveAndBackRef.current) {
        return false
      }
      if (eps >= 0 && isOutOfBounds(startPosRef.current, e, eps)) {
        return false
      }
      return true
    },
    [eps, durationMs, enableMoveAndBack]
  )

  return {
    onPointerDown,
    checkExactClick,
  }
}
