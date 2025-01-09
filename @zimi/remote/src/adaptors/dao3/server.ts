import EventEmitter from 'eventemitter3'
import { isRemoteAdaptorData } from '../../remote'
import { isRemoteValueEvent } from '../../remoteValue/exposeToRemote'
import { type AdaptorPackageData } from '../../adaptor'

interface GamePlayerEntityLike {
  player: {
    userKey: string
  }
}

interface RemoteChannel<T extends GamePlayerEntityLike> {
  onServerEvent(fn: (e: { args: unknown; entity: T }) => void): void
}

/**
 * 这是 [dao3 游戏](https://dao3.fun/) 代码服务端适配器。
 * ```ts
 * const remoteManager = new ServerSideRemoteChannelEventManager(remoteChannel)
 *
 * world.onPlayerLeave(
 *   remoteManager.onPlayerLeave.bind(remoteManager)
 * )
 *
 * export const remoteAdaptor = {
 *   every: remoteManager.onEvery.bind(remoteManager),
 *   off: remoteManager.off.bind(remoteManager),
 *   on: remoteManager.on.bind(remoteManager),
 *   once: remoteManager.once.bind(remoteManager),
 *   emit: (e) => {
 *     const entity = getEntity(e.targetDeviceId)
 *     if (!entity) {
 *       console.error('entity not found')
 *       return
 *     }
 *     remoteChannel.sendClientEvent(entity, e as unknown as JSONValue)
 *   },
 * } satisfies Adaptor
 *
 * ```
 */
export class ServerSideRemoteChannelEventManager<
  T extends GamePlayerEntityLike,
> extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  entityMap: [string, T][] = []

  constructor(remoteChannel: RemoteChannel<T>) {
    super()
    remoteChannel.onServerEvent((e) => {
      const { args } = e
      if (!isRemoteAdaptorData(args)) {
        return
      }
      const prevItem = this.entityMap.find(
        (item) => item[1].player.userKey === e.entity.player.userKey
      )
      if (prevItem) {
        prevItem[0] = args.deviceId
        prevItem[1] = e.entity
      } else {
        this.entityMap.push([args.deviceId, e.entity])
      }
      if (!isRemoteValueEvent(args.name)) {
        this.emit('__remote_every__', args)
      }
      this.emit(args.name, args)
    })
  }

  onPlayerLeave(e: { entity: T }) {
    this.entityMap = this.entityMap.filter(
      (item) => item[1].player.userKey !== e.entity.player.userKey
    )
  }

  onEvery(fn: (args: AdaptorPackageData) => void): void {
    this.on('__remote_every__', fn)
  }

  waitForRegister(entity: T) {
    return new Promise<void>((resolve) => {
      if (
        this.entityMap.some(
          ([_, en]) => en.player.userKey === entity.player.userKey
        )
      ) {
        resolve()
        return
      }
      this.once('__remote_every__', () => {
        resolve()
      })
    })
  }

  getEntity(deviceId: string): T | undefined {
    return this.entityMap.find((item) => item[0] === deviceId)?.[1]
  }

  getIdByEntity(entity: T): string | undefined {
    return this.entityMap.find(
      (item) => item[1].player.userKey === entity.player.userKey
    )?.[0]
  }

  remoteTo(config: { target: T }): {
    targetDeviceId: string
  }
  remoteTo(config: { target: T; timeoutMs: number }): {
    targetDeviceId: string
    timeoutMs: number
  }
  remoteTo({ target, ...rest }: { target: T; timeoutMs?: number }) {
    return {
      targetDeviceId: this.getIdByEntity(target),
      ...rest,
    }
  }
}
