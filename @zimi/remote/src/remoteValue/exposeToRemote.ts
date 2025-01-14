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
}

function defaultOnRequest(e: AdaptorData) {
  return e.data
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
      const { paths, args } = await onRequest(e as AdaptorData)
      if (!exposeTo.includes(e.deviceId) && !exposeTo.includes('*')) {
        throw new RemoteError('permission denied')
      }
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
