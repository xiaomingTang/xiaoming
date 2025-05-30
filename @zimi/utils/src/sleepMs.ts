import { clamp } from 'lodash-es'

const InfiniteTimeout = 2 ** 31 - 1

export async function sleepMs(ms: number): Promise<void> {
  if (Number.isNaN(ms)) {
    throw new Error('invalid input: NaN')
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(), clamp(ms, 0, InfiniteTimeout))
  })
}
