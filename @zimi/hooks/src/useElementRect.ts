import { useState, useEffect } from 'react'
import noop from 'lodash/noop'
import throttle from 'lodash/throttle'
import type { ThrottleSettings } from 'lodash'

const defaultRect: DOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON() {
    return {
      height: defaultRect.height,
      width: defaultRect.width,
      x: defaultRect.x,
      y: defaultRect.y,
      bottom: defaultRect.bottom,
      left: defaultRect.left,
      right: defaultRect.right,
      top: defaultRect.top,
    }
  },
}

/**
 * @returns DOMRect, will update when resized
 * @example
 * ```
 * function MyComponent() {
 *   const ref = useRef<HTMLElement>(null)
 *   const rect = useElementRect(ref)
 * }
 *
 * // or
 *
 * // out of component
 * const element = document.querySelector('xxx')
 *
 * function MyComponent() {
 *   const rect = useElementRect(element)
 * }
 * ```
 */
export function useElementRect(
  element: React.RefObject<HTMLElement> | HTMLElement,
  /**
   * take effect only when ResizeObserver not available
   * @default 500 ms
   */
  delayMs?: number,
  /**
   * take effect only when ResizeObserver not available
   * @param options.trailing @default true
   *
   * @param options.leading @default true
   */
  options?: ThrottleSettings
) {
  const [rect, setRect] = useState(defaultRect)
  const { trailing = true, leading = true } = options ?? {}

  useEffect(() => {
    const finalElement =
      element instanceof HTMLElement ? element : element?.current
    if (!finalElement) {
      return noop
    }
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i]
          if (entry.target === finalElement) {
            setRect(entry.contentRect)
          }
        }
      })
      resizeObserver.observe(finalElement)

      return () => {
        resizeObserver.unobserve(finalElement)
      }
    }
    const resetRect = throttle(
      () => {
        setRect(finalElement.getBoundingClientRect())
      },
      delayMs ?? 500,
      {
        trailing,
        leading,
      }
    )
    resetRect()

    window.addEventListener('resize', resetRect)

    return () => {
      window.removeEventListener('resize', resetRect)
    }
  }, [element, delayMs, leading, trailing])

  return rect
}
