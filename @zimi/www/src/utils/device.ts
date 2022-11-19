import { useState, useEffect } from 'react'
import useWindowSize, { getWindowSize } from '@/hooks/useWindowSize'

export type Platform = 'mobile' | 'tablet' | 'desktop'

/**
 * 检测数据来源:
 * http://www.webapps-online.com/online-tools/user-agent-strings
 * 该函数检查错误率:
 *   - mobile 误认为 tablet: 70/1000 左右
 *   - tablet 误认为 mobile: 50/1000 左右
 *   - 其他共计 10/1000 左右
 */
export function getRawPlatformFromUa(inputUa?: string): Platform {
  const fallbackUa = typeof navigator === 'undefined' ? '' : navigator.userAgent
  const fallbackTouchPoint =
    typeof navigator === 'undefined' ? '' : navigator.maxTouchPoints
  const ua = (inputUa ?? fallbackUa).toLowerCase()

  // 特殊设备优先识别
  if (
    /(opera mini|nokia|blackberry|smartphone|iphone|galaxy|nexus 4|nexus 5|nexus 7|opera mobi)/i.test(
      ua
    )
  ) {
    return 'mobile'
  }

  // 明确表明自己是平板的
  // 先判断平板, 再判断手机; 因为有大量平板的 ua 同时包含 mobie
  if (/ipad|tablet/i.test(ua)) {
    return 'tablet'
  }

  // 明确表明自己是 mobile 的
  // 先判断平板, 再判断手机; 因为有大量平板的 ua 同时包含 mobie
  if (ua.indexOf('mobile') >= 0) {
    return 'mobile'
  }

  // 未表明的 android 设备, 认为是平板
  if (ua.indexOf('android') >= 0) {
    return 'tablet'
  }
  const isMac = /Macintosh/i.test(ua)
  // 支持多指 视为 tablet
  if (isMac && fallbackTouchPoint && fallbackTouchPoint > 2) {
    return 'tablet'
  }

  return 'desktop'
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined'
}

function matchUa(regex: RegExp): boolean {
  return regex.test(navigator.userAgent)
}

export const touchable = isBrowser() && !!window.ontouchstart

export function isWebView() {
  if (!isBrowser()) {
    return false
  }
  const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)',
  ]
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return matchUa(regex)
}

export function isWechat() {
  if (!isBrowser()) {
    return false
  }
  return matchUa(/micromessenger/gi)
}

export function isQQ() {
  if (!isBrowser()) {
    return false
  }
  return matchUa(/QQ/gi)
}

export function getFullscreenElement() {
  if (!isBrowser()) {
    return null
  }
  const doc = window.document
  return (
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  )
}

export const fullScreenEnabled =
  isBrowser() &&
  (document.fullscreenEnabled ??
    document.mozFullScreenEnabled ??
    document.webkitFullScreenEnabled ??
    document.webkitFullscreenEnabled ??
    document.msFullscreenEnabled)

export function isFullScreen() {
  return !!getFullscreenElement()
}

export async function toggleFullScreen(
  element?: Element | null,
  fullscreen?: boolean
) {
  if (!isBrowser()) {
    return
  }
  const doc = window.document
  const docEl = doc.documentElement
  const curFsElement = getFullscreenElement()
  const tarFsElement = curFsElement || element || docEl
  const targetFullscreen = fullscreen ?? !curFsElement

  const requestFullScreen =
    tarFsElement.requestFullscreen ||
    tarFsElement.mozRequestFullScreen ||
    tarFsElement.webkitRequestFullscreen ||
    tarFsElement.webkitRequestFullScreen ||
    tarFsElement.msRequestFullscreen
  const exitFullscreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.webkitExitFullScreen ||
    doc.msExitFullscreen

  if (curFsElement) {
    if (!targetFullscreen) {
      await exitFullscreen.call(doc)
    }
  } else if (targetFullscreen) {
    await requestFullScreen.call(tarFsElement)
  }
}

export function useFullScreen() {
  const [isFullScreenFlag, setIsFullScreenFlag] = useState(isFullScreen)
  useEffect(() => {
    const onFullScreenChanged = () => {
      setIsFullScreenFlag(isFullScreen())
    }
    document.addEventListener('fullscreenchange', onFullScreenChanged)
    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChanged)
    }
  }, [])
  return {
    fullScreenEnabled,
    isFullScreen: isFullScreenFlag,
    toggleFullScreen,
  }
}

export const getRawPlatform = getRawPlatformFromUa

export function useRawPlatform(): Platform {
  useWindowSize('inner')
  return getRawPlatform()
}

export function getPlatform(): Platform {
  const { width } = getWindowSize('inner')
  if (width < 640) {
    return 'mobile'
  }
  if (width < 1024) {
    return 'tablet'
  }
  return 'desktop'
}

export function usePlatform(): Platform {
  const { width } = useWindowSize('inner')
  if (width < 640) {
    return 'mobile'
  }
  if (width < 1024) {
    return 'tablet'
  }
  return 'desktop'
}
