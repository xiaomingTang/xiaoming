import EventEmitter from 'eventemitter3'
import { isRemoteAdaptorData } from '../../remote'
import { type AdaptorPackageData } from '../../adaptor'

interface RemoteChannel {
  onClientEvent(fn: (e: unknown) => void): void
}

/**
 * 这是 [dao3 游戏](https://dao3.fun/) 代码客户端适配器。
 * ```ts
 * const remoteManager = new ClientSideRemoteChannelEventManager(remoteChannel)
 *
 * export const remoteAdaptor = {
 *   every: remoteManager.onEvery.bind(remoteManager),
 *   off: remoteManager.off.bind(remoteManager),
 *   on: remoteManager.on.bind(remoteManager),
 *   once: remoteManager.once.bind(remoteManager),
 *   emit: (e) => {
 *     remoteChannel.sendServerEvent(e)
 *   },
 * } satisfies Adaptor
 * ```
 */
export class ClientSideRemoteChannelEventManager extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  constructor(remoteChannel: RemoteChannel) {
    super()
    remoteChannel.onClientEvent((e) => {
      if (!isRemoteAdaptorData(e)) {
        return
      }
      if (!e.name.startsWith('__REMOTE_VALUE_REQ__')) {
        this.emit('__remote_every__', e)
      }
      this.emit(e.name, e)
    })
  }

  onEvery(fn: (args: AdaptorPackageData) => void): void {
    this.on('__remote_every__', fn)
  }
}
