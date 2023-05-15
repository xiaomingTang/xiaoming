import type { StructAs } from '@zimi/type-utils'

interface AddListenerOptions {
  /**
   * not specified means Infinity
   */
  times?: number
}

export interface EventsOverview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any[]
}

type EventsOverviewWithBuiltIn<E extends EventsOverview> = {
  BUILT_IN_EMIT: [StructAs<E, 'type', 'args'>]
} & E

interface EventRecorder {
  callback: (...args: unknown[]) => void
  times: number
}

/**
 * ``` typescript
 * const eventBus = new EventEmitter<{
 *   'eat': ['apple' | 'peach', number];
 *   'touch': [string];
 * }>()
 *
 * eventBus.addListener('eat', (food, count) => {
 *   console.log(`[eat]: I had eat ${count} ${food}`)
 * })
 *
 * eventBus.addListener('touch', (something) => {
 *   console.log(`[touch]: I'm touching ${something}`)
 * }, {
 *   // only listen twice; Infinity if not specified
 *   times: 2,
 * })
 *
 * eventBus.addListener('BUILT_IN_EMIT', ({ type, args }) => {
 *   switch (type) {
 *     case 'eat': {
 *       const [food, count] = args
 *       console.log(`[BUILT_IN_EMIT]: I had eat ${count} ${food}`)
 *       break
 *     }
 *     case 'touch': {
 *       const [something] = args
 *       console.log(`[BUILT_IN_EMIT]: I'm touching ${something}`)
 *       break
 *     }
 *     default:
 *       break
 *   }
 * })
 *
 * console.log('\nwill eat 2 apple')
 * eventBus.emit('eat', 'apple', 2)
 *
 * console.log('\nwill touch apple')
 * eventBus.emit('touch', 'apple')
 *
 * console.log('\nwill touch peach')
 * eventBus.emit('touch', 'peach')
 *
 * console.log(`
 * will touch apple,
 * but [touch] listener can NOT listen this,
 * as it only listen twice`)
 * eventBus.emit('touch', 'apple')
 * ```
 */
export default class EventEmitter<M extends EventsOverview = EventsOverview> {
  /**
   * 此处为了节省类型判断, 直接用的 as, 但是每次从 eventsMap 中取值, 都必须判空!
   *
   * 奇怪奇怪, 此处不能使用 Record,
   * 否则会导致 eventsMap.BUILT_IN_EMIT 能读但不能写入,
   * ts 类型报错, 写入时提示 BUILT_IN_EMIT 不存在 eventsMap 中,
   * 但明明能读的啊... 暂未找出原因;
   */
  private eventsMap = {} as {
    [key in keyof EventsOverviewWithBuiltIn<M>]: EventRecorder[]
  }

  addListener<K extends keyof EventsOverviewWithBuiltIn<M>>(
    eventName: K,
    handler: (...args: EventsOverviewWithBuiltIn<M>[K]) => void,
    options?: AddListenerOptions
  ) {
    if (!this.eventsMap[eventName]) {
      // init
      this.eventsMap[eventName] = []
    }
    const times = options?.times ?? Infinity
    const list = this.eventsMap[eventName]
    const idx = list.findIndex((item) => item.callback === handler)
    if (idx >= 0) {
      list[idx].times = times
    } else {
      list.push({
        callback: handler as EventRecorder['callback'],
        times,
      })
    }
    return this
  }

  removeListener<K extends keyof EventsOverviewWithBuiltIn<M>>(
    eventName: K,
    handler?: (...args: EventsOverviewWithBuiltIn<M>[K]) => void
  ) {
    if (this.eventsMap[eventName]) {
      if (handler) {
        this.eventsMap[eventName] = this.eventsMap[eventName].filter(
          (item) => item.callback !== handler
        )
      } else {
        this.eventsMap[eventName] = []
      }
    }
    return this
  }

  emit<K extends keyof M>(eventName: K, ...args: M[K]) {
    if (this.eventsMap.BUILT_IN_EMIT) {
      this.eventsMap.BUILT_IN_EMIT = this.eventsMap.BUILT_IN_EMIT.filter(
        (item) => {
          if (item.times > 0) {
            item.callback({
              type: eventName,
              args,
            })
            // eslint-disable-next-line no-param-reassign
            item.times -= 1
          }
          return item.times > 0
        }
      )
    }
    if (this.eventsMap[eventName]) {
      this.eventsMap[eventName] = this.eventsMap[eventName].filter((item) => {
        if (item.times > 0) {
          item.callback(...args)
          // eslint-disable-next-line no-param-reassign
          item.times -= 1
        }
        return item.times > 0
      })
    }
    return this
  }
}

export type HandlersOf<T extends EventsOverview> = T extends EventsOverview
  ? {
      [key in keyof T | 'BUILT_IN_EMIT']: (
        ...args: EventsOverviewWithBuiltIn<T>[key]
      ) => void
    }
  : never

console.log('test-ci-7')
