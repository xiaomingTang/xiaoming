import type { ThrottleSettings } from 'lodash'
import throttle from 'lodash/throttle'
import { useEffect, useRef, useState } from 'react'

interface Size {
  width: number
  height: number
}

const defaultSize: Size = {
  width: typeof window === 'undefined' ? -1 : window.innerWidth,
  height: typeof window === 'undefined' ? -1 : window.innerHeight,
}

type GetWindowSizeType = 'inner' | 'outer'

export function getWindowSize(type: GetWindowSizeType): Size {
  if (typeof window === 'undefined') {
    return {
      ...defaultSize,
    }
  }
  return {
    width: window[`${type}Width`],
    height: window[`${type}Height`],
  }
}

let windowSizeInited = false

export function useWindowSize(
  type: GetWindowSizeType,
  /**
   * @default 500 ms
   */
  delayMs?: number,
  /**
   * @param options.trailing @default true
   *
   * @param options.leading @default true
   */
  options?: ThrottleSettings
): Size {
  const isUnloadedRef = useRef(false)
  const [size, setSize] = useState(defaultSize)
  const { trailing = true, leading = true } = options ?? {}

  useEffect(() => {
    isUnloadedRef.current = false
    const onResize = throttle(
      () => {
        if (isUnloadedRef.current) {
          return
        }
        windowSizeInited = true
        const curWindowSize = getWindowSize(type)
        // window size 缓存到 defaultSize 中, 以供其他组件使用
        defaultSize.width = curWindowSize.width
        defaultSize.height = curWindowSize.height
        setSize(curWindowSize)
      },
      delayMs ?? 500,
      {
        leading,
        trailing,
      }
    )

    if (!windowSizeInited) {
      onResize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      isUnloadedRef.current = true
      window.removeEventListener('resize', onResize)
    }
  }, [delayMs, leading, trailing, type])

  return size
}
