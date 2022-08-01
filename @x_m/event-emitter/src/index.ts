export const EventEmitter = 'EventEmitter'

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
  console.log('testPromise start')
  await Promise.allSettled([
    sleepMs(1500),
    sleepMs(2000),
    sleepMs(2500),
  ])
  console.log('testPromise end')
}
