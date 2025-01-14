import { Adaptor, AdaptorPackageData } from '../adaptor'
import { RemoteError, response } from '../response'
import { RemoteCallData } from './type'

type AdaptorData = AdaptorPackageData<RemoteCallData>

interface ExposeProps {
  globalName: string
  adaptor: Adaptor
  /**
   * ['*'] or ['device_id_1', 'device_id_2']
   */
  exposeTo: string[]
  /**
   * 你可以在该回调中抛错，以阻止远程调用，
   * 也可以修改传入的 data
   */
  onRequest?: (e: AdaptorData) => RemoteCallData | Promise<RemoteCallData>
  /**
   * 如果你想要自定义处理函数,
   * 需要谨慎且完善地处理各种 paths, args,
   * 以避免远程调用时出现未预期的错误。
   *
   * ---
   *
   * 我的默认处理程序谨供参考:
   * ``` ts
   * let target = obj
   * for (let i = 0; i < data.paths.length; i += 1) {
   *   target = target[data.paths[i] as keyof typeof target] as typeof target
   * }
   * if (target instanceof Function) {
   *   return target(...data.args)
   * }
   * return target
   * ```
   *
   * @returns 返回值将会被发送给远程调用方，可以是立即数，也可以是 Promise（Promise 会 await 后再返回）
   */
  handler?: (e: AdaptorData) => unknown
}

function defaultOnRequest(e: AdaptorData) {
  return e.data
}

const geneDefaultHandler: <T>(obj: T) => (data: AdaptorData) => unknown =
  (obj) =>
  ({ data }) => {
    let target = obj
    for (let i = 0; i < data.paths.length; i += 1) {
      target = target[data.paths[i] as keyof typeof target] as typeof target
    }
    if (target instanceof Function) {
      return target(...data.args)
    }
    return target
  }

export function isRemoteValueEvent(eventName: string) {
  return eventName.startsWith('__REMOTE_VALUE_REQ__')
}

export function exposeToRemote<T extends object>(obj: T, options: ExposeProps) {
  const {
    globalName,
    adaptor,
    exposeTo,
    handler: inputHandler,
    onRequest = defaultOnRequest,
  } = options
  const callback = async (e: AdaptorPackageData) => {
    try {
      const data = await onRequest(e as AdaptorData)
      if (!exposeTo.includes(e.deviceId) && !exposeTo.includes('*')) {
        throw new RemoteError('permission denied')
      }
      const handler = inputHandler ?? geneDefaultHandler(obj)
      const res = await handler({
        ...e,
        data,
      })
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
