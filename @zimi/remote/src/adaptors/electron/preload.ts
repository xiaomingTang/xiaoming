/* eslint-disable @typescript-eslint/no-explicit-any */

import { KEYOF_GET_ID, MESSENGER_EVENT_NAME, MESSENGER_KEY } from './constants'

/**
 * 在 preload 进程中初始化 messenger 对象
 */
export function initMessengerInPreload(
  contextBridge: Electron.ContextBridge,
  ipcRenderer: Electron.IpcRenderer
) {
  contextBridge.exposeInMainWorld(MESSENGER_KEY, {
    postMessage: (data: any) => {
      ipcRenderer.postMessage(MESSENGER_EVENT_NAME, data)
    },
    getId: () => ipcRenderer.invoke(KEYOF_GET_ID),
    on: (channel: string, listener: (...args: any[]) => void) => {
      ipcRenderer.on(channel, (_, ...args) => listener(...args))
    },
  })
}
