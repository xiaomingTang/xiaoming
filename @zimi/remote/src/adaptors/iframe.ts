import EventEmitter from 'eventemitter3'
import { isRemoteAdaptorData } from '../remote'

import type { Adaptor, AdaptorPackageData } from '../adaptor'

class RemoteEventManager extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  EVERY_EVENT_NAME = '__remote_every__'

  constructor() {
    super()
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('message', (event) => {
      const { data } = event
      if (isRemoteAdaptorData(data)) {
        this.emit(data.name, data)
        // 一定要抛出 every 事件，remote 包基于此处理远端的响应
        this.emit(this.EVERY_EVENT_NAME, data)
      }
    })
  }

  onEvery(fn: (data: AdaptorPackageData) => void) {
    this.on(this.EVERY_EVENT_NAME, fn)
  }
}

export function createIframeAdaptor({
  onEmit,
}: {
  onEmit: (data: AdaptorPackageData) => void
}) {
  const remoteEventManager = new RemoteEventManager()

  const adaptor: Adaptor = {
    every: remoteEventManager.onEvery.bind(remoteEventManager),
    once: remoteEventManager.once.bind(remoteEventManager),
    off: remoteEventManager.off.bind(remoteEventManager),
    emit: onEmit,
  }

  return adaptor
}
