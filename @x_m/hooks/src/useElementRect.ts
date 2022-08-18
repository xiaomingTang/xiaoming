import { useState, useEffect } from 'react'
import omit from 'lodash/omit'
import noop from 'lodash/noop'

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
export function useElementRect(element?: React.RefObject<HTMLElement> | HTMLElement | null) {
  const [rect, setRect] = useState(defaultRect)

  useEffect(() => {
    const finalElement = element instanceof HTMLElement ? element : element?.current
    if (finalElement) {
      const resetRect = () => {
        setRect(finalElement.getBoundingClientRect())
      }
      resetRect()
      window.addEventListener('resize', resetRect)

      return () => {
        window.removeEventListener('resize', resetRect)
      }
    }
    return noop
  }, [element])

  return rect
}
