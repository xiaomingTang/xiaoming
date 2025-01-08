import { Adaptor, AdaptorPackageData } from '../adaptor'
import { RemoteError, response } from '../response'

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

export function isRemoteValueEvent(eventName: string) {
  return eventName.startsWith('__REMOTE_VALUE_REQ__')
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
      for (let i = 0; i < paths.length; i += 1) {
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
