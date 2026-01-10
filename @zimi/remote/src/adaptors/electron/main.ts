import EventEmitter from 'eventemitter3'

import { BrowserWindow, ipcMain } from 'electron'
import { Adaptor, AdaptorPackageData } from '../../adaptor'
import { isRemoteAdaptorData } from '../../remote'
import { KEYOF_GET_ID, MESSENGER_EVENT_NAME } from './constants'

class RemoteEventManager extends EventEmitter<{
  [key: string]: [AdaptorPackageData]
}> {
  EVERY_EVENT_NAME = '__remote_every__'

  constructor() {
    super()
    ipcMain.on(MESSENGER_EVENT_NAME, (_, data) => {
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

export function onElectronMainEmit(data: AdaptorPackageData) {
  // 主进程通过 webContents 发送消息到渲染进程
  const allWindows = BrowserWindow.getAllWindows()
  const win = allWindows.find(
    (w) => w.webContents.id.toString() === data.targetDeviceId
  )
  win?.webContents.send(MESSENGER_EVENT_NAME, data)
}

interface Options {
  onEmit?: (data: AdaptorPackageData) => void
}

export function createElectronMainAdaptor(options?: Options) {
  const onEmit = options?.onEmit ?? onElectronMainEmit
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

export function initMessengerInMain() {
  ipcMain.handle(KEYOF_GET_ID, (event) => event.sender.id.toString())
}
