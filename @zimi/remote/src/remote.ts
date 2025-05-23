import {
  RemoteError,
  RemoteNotFoundError,
  RemoteTimeoutError,
  response,
} from './response'

import type { Adaptor, AdaptorCallback, AdaptorPackageData } from './adaptor'

const RESPONSE_PREFIX = '_response_'

type LogFunc = (...data: unknown[]) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RemoteCallableFunc = (data: any) => Promise<any>

interface RemoteFuncRecords {
  [key: string]: RemoteCallableFunc
}

type FuncMapWithConfig<T extends RemoteFuncRecords> = {
  [K in keyof T]: T[K] extends (data: infer Arg) => Promise<infer Ret>
    ? (
        data: Arg,
        config?: {
          timeoutMs?: number
          targetDeviceId?: string
        }
      ) => Promise<Ret>
    : never
}

type RegisteredFunc<T extends RemoteCallableFunc> = T extends (
  data: infer Arg
) => infer Ret
  ? (
      data: Arg,
      ctx: {
        /**
         * 对方的设备 id
         */
        deviceId: string
      }
    ) => Ret
  : never

function defaultLog(
  this: Remote<
    {
      [key: string]: RemoteCallableFunc
    },
    {
      [key: string]: RemoteCallableFunc
    }
  >,
  ...data: unknown[]
) {
  if (!this.debug) {
    return
  }
  console.log(`[remote of ${this.deviceId}]`, ...data)
}

export class Remote<
  /**
   * MF means my functions
   */
  MF extends RemoteFuncRecords,
  /**
   * OF means others functions
   */
  OF extends RemoteFuncRecords,
> {
  debug = false

  private log: LogFunc

  /**
   * （调用对方函数时的）默认超时时间，单位 ms
   * @default 30000
   */
  private defaultTimeoutMs = 30000

  private map: {
    [key: string]: {
      callback: RegisteredFunc<RemoteCallableFunc>
    }
  } = {}

  private deviceIdValue = ''

  /**
   * 设备 id 应该唯一，用于区分不同设备。
   * 你可以在任何时候修改（更新）它。
   * @default ''
   */
  get deviceId() {
    return this.deviceIdValue
  }

  set deviceId(deviceId: string) {
    this.log(`deviceId set: from "${this.deviceIdValue}" to "${deviceId}"`)
    this.deviceIdValue = deviceId
  }

  constructor(
    private adaptor: Adaptor,
    config?: {
      /**
       * 设备 id 应该唯一，用于区分不同设备。
       * 你可以在任何时候修改（更新）它。
       * @default ''
       */
      deviceId?: string
      /**
       * （调用对方函数时的）默认超时时间，单位 ms
       * @default 30000
       */
      defaultTimeoutMs?: number
      debug?: boolean
      /**
       * 格式化 AdaptorPackageData 的函数，
       * 用于调试时输出日志。
       * @default JSON.stringify
       */
      log?: LogFunc
    }
  ) {
    this.debug = config?.debug ?? this.debug
    this.defaultTimeoutMs = config?.defaultTimeoutMs ?? this.defaultTimeoutMs
    this.log = config?.log ?? defaultLog.bind(this)
    this.deviceId = config?.deviceId ?? this.deviceId

    adaptor.every(async (e) => {
      const { deviceId: selfDeviceId } = this
      const { name, data, deviceId: targetDeviceId, callbackName } = e
      const callback = this.map[name]?.callback
      if (!callback) {
        if (name.startsWith(RESPONSE_PREFIX)) {
          // 这是响应，会在 callAsync once 中处理，这儿不用处理
          this.log('[every] response received: ', e)
          return
        }
        this.log('callback not found: ', name)
        if (callbackName) {
          adaptor.emit({
            deviceId: selfDeviceId,
            targetDeviceId,
            name: callbackName,
            data: response.error(
              new RemoteNotFoundError(`callback not found: ${name}`)
            ),
          })
        }
        return
      }
      if (!callbackName) {
        this.log('should not respond: ', e)
        void callback(data, { deviceId: targetDeviceId })
        return
      }
      this.log(`callback: ${name}; respondName: ${callbackName}; data: `, data)
      try {
        const ret = await callback(data, { deviceId: targetDeviceId })
        this.log('callback return: ', ret)
        adaptor.emit({
          deviceId: selfDeviceId,
          targetDeviceId,
          name: callbackName,
          data: response.success(ret),
        })
      } catch (error) {
        this.log('callback error: ', error)
        adaptor.emit({
          deviceId: selfDeviceId,
          targetDeviceId,
          name: callbackName,
          data: response.error(RemoteError.fromError(error)),
        })
      }
    })
  }

  /**
   * 调用其他端的方法；会等待对方响应。
   * 不能直接使用该方法，应该使用 proxy。
   * @WARNING 不能用于响应其他端。
   */
  private callAsync(
    name: string,
    data: unknown,
    config?: {
      timeoutMs?: number
      targetDeviceId?: string
    }
  ) {
    const timeoutMs = config?.timeoutMs ?? this.defaultTimeoutMs
    const { deviceId } = this
    const randomStr = Math.random().toString(36).slice(2)
    // 本条消息的响应名
    const responseName = `${RESPONSE_PREFIX}-${name}-${deviceId}-${randomStr}`
    return new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout | undefined
      this.log(`callAsync ${name}: waiting for response: ${responseName}`)
      const callback: AdaptorCallback = (e) => {
        clearTimeout(timer)
        this.log(`response received: ${responseName}`, e)
        if (RemoteError.isRemoteError(e.data)) {
          reject(RemoteError.fromError(e.data))
        } else {
          resolve((e.data as ReturnType<typeof response.success>)?.data)
        }
      }
      this.adaptor.once(responseName, callback)
      timer = setTimeout(() => {
        this.log(`timeout: ${responseName}`)
        this.adaptor.off(responseName, callback)
        reject(new RemoteTimeoutError(`timeout: ${name}`))
      }, timeoutMs)
      this.adaptor.emit({
        deviceId,
        targetDeviceId: config?.targetDeviceId ?? '',
        name,
        data,
        callbackName: responseName,
      })
    })
  }

  /**
   * 注册方法，供对方调用；
   */
  register<K extends keyof MF>(name: K, callback: RegisteredFunc<MF[K]>): void {
    this.map[name as string] = { callback }
  }

  _ = new Proxy<FuncMapWithConfig<OF>>({} as FuncMapWithConfig<OF>, {
    get: (_, k) => this.callAsync.bind(null, k as string),
  })

  self = new Proxy<MF>({} as MF, {
    get: (_, k) => (data: unknown) =>
      this.map[k as string]?.callback.apply(null, [
        data,
        {
          deviceId: this.deviceId,
        },
      ]),
  })
}

export function isRemoteAdaptorData(data: unknown): data is AdaptorPackageData {
  return (
    !!data &&
    typeof data === 'object' &&
    'deviceId' in data &&
    'name' in data &&
    typeof data.deviceId === 'string' &&
    typeof data.name === 'string' &&
    !!data.deviceId &&
    !!data.name
  )
}
