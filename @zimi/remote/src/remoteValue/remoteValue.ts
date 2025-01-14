import { RemoteError, RemoteTimeoutError, response } from '../response'
import { Adaptor, AdaptorCallback, AdaptorPackageData } from '../adaptor'
import type { RemoteCallData, ToFunc } from './type'

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
  log?: boolean
}

function geneProxy<T extends object>(paths: string[], props: RemoteValueProps) {
  return new Proxy<ToFunc<T>>(noop as unknown as ToFunc<T>, {
    apply(target, thisArg, argArray) {
      const {
        adaptor,
        globalName,
        timeoutMs = 30000,
        log = false,
        ...restProps
      } = props
      const randomStr = Math.random().toString(36).slice(2)
      const name = `__REMOTE_VALUE_REQ__${globalName}`
      const responseName = `__REMOTE_VALUE_RES__${[globalName, ...paths].join('.')}-${randomStr}`

      if (log) {
        console.log(
          `[remoteValue] [${restProps.deviceId}] 正在访问远端 [${restProps.targetDeviceId}] 的变量: "${[globalName, ...paths].join('.')}"`
        )
      }

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
          } satisfies RemoteCallData,
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
