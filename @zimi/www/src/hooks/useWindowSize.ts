import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'
import { WebStorage } from '@/storage/webStorage'

export interface Size {
  width: number
  height: number
}

const defaultSize: Size = WebStorage.getAndParse('WINDOW_SIZE') || {
  width: typeof window === 'undefined' ? -1 : window.innerWidth,
  height: typeof window === 'undefined' ? -1 : window.innerHeight,
}

type GetWindowSizeType = 'inner' | 'outer'
type GetWindowSizeProperties = `${GetWindowSizeType}${'Width' | 'Height'}`

export function getWindowSize(type: GetWindowSizeType): Size {
  if (typeof window === 'undefined') {
    return {
      ...defaultSize,
    }
  }
  const widthKey: GetWindowSizeProperties = `${type}Width`
  const heightKey: GetWindowSizeProperties = `${type}Height`
  return {
    width: window[widthKey],
    height: window[heightKey],
  }
}

let windowSizeInited = false

export default function useWindowSize(type: GetWindowSizeType) {
  // 是否已被卸载
  const isUnloadedRef = useRef(true)
  const [size, setSize] = useState(defaultSize)

  useEffect(() => {
    isUnloadedRef.current = false
    const onResize = throttle(
      () => {
        // 未被卸载才执行 setState
        // (由于被 throttle, 可能在组件被卸载之后仍在执行, 所以需要加一个 flag)
        if (!isUnloadedRef.current) {
          const curWindowSize = getWindowSize(type)
          // window size 缓存到 defaultSize 中
          // 以供其他组件使用(其他组件默认就可以取到正确的 size)
          defaultSize.width = curWindowSize.width
          defaultSize.height = curWindowSize.height
          WebStorage.setAndStringify('WINDOW_SIZE', curWindowSize)
          setSize(curWindowSize)
        }
      },
      500,
      {
        leading: false,
        trailing: true,
      }
    )
    // 初始化时主动调用一次
    if (!windowSizeInited) {
      windowSizeInited = true
      onResize()
    }
    window.addEventListener('resize', onResize)
    return () => {
      isUnloadedRef.current = true
      window.removeEventListener('resize', onResize)
    }
  }, [type])

  return size
}

/**
 * - portrait: 竖屏
 * - landscape: 横屏
 */
export type WindowOrientation = 'portrait' | 'landscape'

/**
 * 基于设备尺寸返回横屏 or 竖屏
 * - portrait: 竖屏
 * - landscape: 横屏
 */
export function getWindowOrientation(): WindowOrientation {
  const windowSize = getWindowSize('inner')
  return windowSize.width <= windowSize.height ? 'portrait' : 'landscape'
}

/**
 * 基于设备尺寸返回横屏 or 竖屏
 * - portrait: 竖屏
 * - landscape: 横屏
 */
export function useWindowOrientation(): WindowOrientation {
  const windowSize = useWindowSize('inner')
  return windowSize.width <= windowSize.height ? 'portrait' : 'landscape'
}
