import EventEmitter from 'eventemitter3'
import { Adaptor, AdaptorPackageData } from '../../adaptor'
import { isRemoteAdaptorData } from '../../remote'
import { getMessenger } from './messenger'
import { MESSENGER_EVENT_NAME } from './constants'

class RemoteEventManager extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  EVERY_EVENT_NAME = '__remote_every__'

  constructor() {
    super()
    if (typeof window === 'undefined') {
      return
    }
    getMessenger().on(MESSENGER_EVENT_NAME, (data) => {
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

export function onElectronRendererEmit(data: AdaptorPackageData) {
  getMessenger().postMessage(data)
}

interface Options {
  onEmit?: (data: AdaptorPackageData) => void
}

export function createElectronRendererAdaptor(options?: Options) {
  const onEmit = options?.onEmit ?? onElectronRendererEmit
  const remoteEventManager = new RemoteEventManager()

  const adaptor: Adaptor = {
    every: remoteEventManager.onEvery.bind(remoteEventManager),
    on: remoteEventManager.on.bind(remoteEventManager),
    once: remoteEventManager.once.bind(remoteEventManager),
    off: remoteEventManager.off.bind(remoteEventManager),
    emit: onEmit,
  }

  return adaptor
}
