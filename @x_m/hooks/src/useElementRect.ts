import { useState, useEffect } from 'react'
import omit from 'lodash/omit'
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
    return omit(defaultRect, 'toJson')
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
  element?: React.RefObject<HTMLElement> | HTMLElement | null,
  /**
   * ms; default: 500
   */
  wait?: number,
  /**
   * options.trailing; default: true
   *
   * options.leading; default: false
   */
  options?: ThrottleSettings
) {
  const [rect, setRect] = useState(defaultRect)

  useEffect(() => {
    const finalElement =
      element instanceof HTMLElement ? element : element?.current
    if (finalElement) {
      const resetRect = throttle(
        () => {
          setRect(finalElement.getBoundingClientRect())
        },
        wait ?? 500,
        {
          trailing: options?.trailing ?? true,
          leading: options?.leading ?? false,
        }
      )
      resetRect()
      window.addEventListener('resize', resetRect)

      return () => {
        window.removeEventListener('resize', resetRect)
      }
    }
    return noop
  }, [element, wait, options?.leading, options?.trailing])

  return rect
}
