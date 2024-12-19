import EventEmitter from 'eventemitter3'

import type { Adaptor, AdaptorPackageData } from '../adaptor'

class RemoteEventManager extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  EVERY_EVENT_NAME = '__remote_every__'

  onEvery(fn: (data: AdaptorPackageData) => void) {
    this.on(this.EVERY_EVENT_NAME, fn)
  }
}

export const remoteEventManager = new RemoteEventManager()

export function createHttpAdaptor({
  onEmit,
}: {
  onEmit: (data: AdaptorPackageData) => void
}) {
  const adaptor: Adaptor = {
    every: remoteEventManager.onEvery.bind(remoteEventManager),
    on: remoteEventManager.on.bind(remoteEventManager),
    once: remoteEventManager.once.bind(remoteEventManager),
    off: remoteEventManager.off.bind(remoteEventManager),
    emit: onEmit,
  }

  return adaptor
}
