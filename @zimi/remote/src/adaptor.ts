export interface AdaptorPackageData {
  /**
   * 自身设备 id，应确保唯一性（对方能凭借该 deviceId 找到该设备）
   */
  deviceId: string
  /**
   * 对方的设备 id
   */
  targetDeviceId: string
  /**
   * 远程调用的对方的方法名
   */
  name: string
  data: unknown
  /**
   * 所需回调的方法名（如果需要回调的话）
   */
  callbackName?: string
}

type Func<D = unknown, R = unknown> = (data: D) => R

type AdaptorCallback = Func<AdaptorPackageData, void>

export interface Adaptor {
  every: (callback: AdaptorCallback) => void
  /**
   * off 用于移除 once 注册的事件，当事件超时后，需要主动 off
   */
  off: (name: string, callback: AdaptorCallback) => void
  on: (name: string, callback: AdaptorCallback) => void
  once: (name: string, callback: AdaptorCallback) => void
  emit: (data: AdaptorPackageData) => void
}
