import noop from 'lodash/noop'
import { useState, useEffect } from 'react'
import { useMuiEventCallback } from './useMuiEventCallback'

type ClickHandler = (e: PointerEvent) => void | Promise<void>

interface PointerParam {
  time: number
  x: number
  y: number
}

const defaultPointer = {
  time: -1,
  x: -1,
  y: -1,
} satisfies PointerParam

function getParamFromPointerEvent(e: PointerEvent): PointerParam {
  return {
    time: Date.now(),
    x: e.pageX,
    y: e.pageY,
  }
}

function isLegalClick({
  prev,
  next,
  legalDelta,
}: {
  prev: PointerParam
  next: PointerParam
  legalDelta: PointerParam
}) {
  return (
    next.time - prev.time >= 0 &&
    next.time - prev.time <= legalDelta.time &&
    next.x - prev.x >= 0 &&
    next.x - prev.x <= legalDelta.x &&
    next.y - prev.y >= 0 &&
    next.y - prev.y <= legalDelta.y
  )
}

interface SimulateClickProps {
  onClick: ClickHandler
  legalDelta?: Partial<PointerParam>
}

/**
 * 以 pointer event 来模拟 click 事件,
 *
 * 适用场合: 需要严格点击事件的。
 *
 * 如果在 pointerdown -> move -> pointerup 我们不希望触发 click 事件时,
 *
 * 就可以使用该 hook.
 *
 *  ```tsx
 * const setClickElem = useSimulateClick({
 *   onClick: () => {
 *     console.log('strictly clicked.')
 *   },
 * })
 *
 * return (
 *   <Button ref={setClickElem}>
 *     Click Me
 *   </Button>
 * )
 * ```
 */
export function useSimulateClick({
  onClick: rawOnClick,
  legalDelta,
}: SimulateClickProps) {
  const [elem, setElem] = useState<HTMLElement | undefined | null>(null)
  const onClick = useMuiEventCallback(rawOnClick)
  const legalDeltaTime = legalDelta?.time ?? Infinity
  const legalDeltaX = legalDelta?.x ?? 40
  const legalDeltaY = legalDelta?.y ?? 40

  useEffect(() => {
    if (!elem) {
      return noop
    }
    let lastPointer = defaultPointer
    const onPointerDown = (e: PointerEvent) => {
      lastPointer = getParamFromPointerEvent(e)
    }
    const onPointerUp = (e: PointerEvent) => {
      if (
        isLegalClick({
          prev: lastPointer,
          next: getParamFromPointerEvent(e),
          legalDelta: {
            time: legalDeltaTime,
            x: legalDeltaX,
            y: legalDeltaY,
          },
        })
      ) {
        onClick(e)
      }
      lastPointer = defaultPointer
    }
    elem.addEventListener('pointerdown', onPointerDown)
    elem.addEventListener('pointerup', onPointerUp)

    return () => {
      elem.removeEventListener('pointerdown', onPointerDown)
      elem.removeEventListener('pointerup', onPointerUp)
    }
  }, [elem, legalDeltaTime, legalDeltaX, legalDeltaY, onClick])

  return setElem
}
