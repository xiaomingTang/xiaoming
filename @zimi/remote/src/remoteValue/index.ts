import { RemoteError, RemoteTimeoutError, response } from '../response'
import { Adaptor, AdaptorCallback, AdaptorPackageData } from '../adaptor'
import type { ToFunc } from './type'

function noop() {
  // pass
}

type RemoteValueProps = Pick<
  AdaptorPackageData,
  'deviceId' | 'targetDeviceId'
> & {
  globalName: string
  adaptor: Adaptor
  timeoutMs?: number
}

function geneProxy<T extends object>(paths: string[], props: RemoteValueProps) {
  return new Proxy<ToFunc<T>>(noop as unknown as ToFunc<T>, {
    apply(target, thisArg, argArray) {
      const { adaptor, globalName, timeoutMs = 30000, ...restProps } = props
      const randomStr = Math.random().toString(36).slice(2)
      const name = `__REMOTE_VALUE_REQ__${globalName}`
      const responseName = `__REMOTE_VALUE_RES__${[globalName, ...paths].join('.')}-${randomStr}`

      return new Promise((resolve, reject) => {
        let timer: NodeJS.Timeout | undefined
        const callback: AdaptorCallback = (e) => {
          clearTimeout(timer)
          if (RemoteError.isRemoteError(e.data)) {
            reject(RemoteError.fromError(e.data))
          } else {
            resolve((e.data as ReturnType<typeof response.success>)?.data)
          }
        }
        adaptor.once(responseName, callback)
        timer = setTimeout(() => {
          adaptor.off(responseName, callback)
          reject(
            new RemoteTimeoutError(
              `timeout: ${[globalName, ...paths].join('.')}`
            )
          )
        }, timeoutMs)
        adaptor.emit({
          name,
          callbackName: responseName,
          ...restProps,
          data: {
            paths,
            args: argArray,
          },
        })
      })
    },
    get(target, prop) {
      return geneProxy([...paths, prop as string], props)
    },
  })
}

/**
 * @example
 * ```
 * const obj = remoteValue<{
 *   a: number;
 *   b: {
 *     c: string;
 *   };
 *   funcD: () => number
 * }>()
 *
 * const val_1 = await obj.a()      // number
 * const val_2 = await obj.b()      // { c: string }
 * const val_3 = await obj.b.c()    // string
 * const val_4 = await obj.funcD()  // number
 * ```
 */
export function remoteValue<T extends object>(props: RemoteValueProps) {
  return geneProxy<T>([], props)
}

interface ExposeProps {
  globalName: string
  adaptor: Adaptor
  /**
   * ['*'] or ['device_id_1', 'device_id_2']
   */
  exposeTo: string[]
  /**
   * 你可以在该回调中抛错，以阻止远程调用
   */
  onRequest?: (e: AdaptorPackageData) => void | Promise<void>
}

function defaultOnRequest(e: AdaptorPackageData) {
  return e
}

export function exposeToRemote<T extends object>(obj: T, options: ExposeProps) {
  const {
    globalName,
    adaptor,
    exposeTo,
    onRequest = defaultOnRequest,
  } = options
  const callback = async (e: AdaptorPackageData) => {
    try {
      await onRequest(e)
      if (!exposeTo.includes(e.deviceId) && !exposeTo.includes('*')) {
        throw new RemoteError('permission denied')
      }
      const { paths, args } = e.data as { paths: string[]; args: unknown[] }
      let target = obj
      for (let i = 0; i < paths.length - 1; i += 1) {
        target = target[paths[i] as keyof typeof target] as typeof target
      }
      let res: unknown
      if (target instanceof Function) {
        res = await target(...args)
      } else {
        res = target
      }
      adaptor.emit({
        name: e.callbackName ?? 'IMPOSSIBLE_NO_CALLBACK_NAME',
        deviceId: e.targetDeviceId,
        targetDeviceId: e.deviceId,
        data: response.success(res),
      })
    } catch (error) {
      adaptor.emit({
        name: e.callbackName ?? 'IMPOSSIBLE_NO_CALLBACK_NAME',
        deviceId: e.targetDeviceId,
        targetDeviceId: e.deviceId,
        data: response.error(RemoteError.fromError(error)),
      })
    }
  }
  adaptor.on(`__REMOTE_VALUE_REQ__${globalName}`, callback)
  return () => {
    adaptor.off(`__REMOTE_VALUE_REQ__${globalName}`, callback)
  }
}
