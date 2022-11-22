// https://github.com/qvil/use-pwa-install
import { useEffect, useState } from 'react'

import { BeforeInstallPromptEvent } from './types'

export default function usePWAInstall() {
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  const install = async () => {
    if (!beforeInstallPromptEvent) {
      throw new Error('Not ready for install or has been installed')
    }

    beforeInstallPromptEvent.prompt()

    const { outcome } = await beforeInstallPromptEvent.userChoice

    if (outcome === 'dismissed') {
      throw new Error('Dismissed')
    }
  }

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setBeforeInstallPromptEvent(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      setBeforeInstallPromptEvent(null)
    }

    window.addEventListener('appinstalled', handler)

    return () => {
      window.removeEventListener('appinstalled', handler)
    }
  }, [])

  return {
    isInstalled: !beforeInstallPromptEvent,
    /**
     * 抛错表示添加失败(浏览器不支持 或 应用已安装 或 用户点击取消);
     * 不抛错表示尝试安装(不代表已经成功)
     */
    install,
  }
}
