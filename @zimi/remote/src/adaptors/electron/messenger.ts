/* eslint-disable @typescript-eslint/no-explicit-any */

import { MESSENGER_KEY } from './constants'

interface Messenger {
  postMessage: (data: any) => void
  getId: () => Promise<string>
  on: (channel: string, listener: (...args: any[]) => void) => void
}

export function getMessenger() {
  return window[MESSENGER_KEY as keyof Window] as Messenger
}
