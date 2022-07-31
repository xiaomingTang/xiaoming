import { EventEmitter } from '@xm/event-emitter'

export const PrizeWheel = 'PrizeWheel'

export function sleepMs(ms: number) {
  return new Promise<void>((resolve) => {
    console.log(`sleep ${ms} start`)
    window.setTimeout(() => {
      console.log(`sleep ${ms} end`)
      resolve()
    }, ms)
  })
}

export async function testPromise() {
  console.log(`imported from '@xm/event-emitter': ${EventEmitter}`)
  console.log('testPromise start')
  await Promise.allSettled([
    sleepMs(1500),
    sleepMs(2000),
    sleepMs(2500),
  ])
  console.log('testPromise end')
}
