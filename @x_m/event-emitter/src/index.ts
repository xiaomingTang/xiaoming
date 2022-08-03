interface AddListenerOptions {
  /**
   * not specified means Infinity
   */
  times?: number
}

interface EventsOverview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any[]
}

interface EventRecorder {
  callback: (...args: unknown[]) => void
  times: number
}

/**
 * ``` typescript
 * const eventBus = new EventEmitter<{
 *   'eat': ['apple' |'peach', number];
 *   'touch': [string];
 * }>()
 *
 * eventBus.addListener('eat', (food, count) => {
 *   console.log(`I had eat ${count} ${food}`)
 * })
 *
 * eventBus.addListener('touch', (something) => {
 *   console.log(`I'm touching ${something}`)
 * }, {
 *   // only triggered twice; Infinity if not specified
 *   times: 2,
 * })
 *
 * // I had eat 2 apple
 * eventBus.emit('eat', 'apple', 2)
 *
 * // I'm touching apple
 * eventBus.emit('touch', 'apple')
 * // I'm touching peach
 * eventBus.emit('touch', 'peach')
 * // NOT triggered, as it only triggered twice
 * eventBus.emit('touch', 'apple')
 * ```
 */
export default class EventEmitter<M extends EventsOverview = EventsOverview> {
  #eventsMap = {} as Record<keyof M, EventRecorder[]>

  addListener<K extends keyof M>(
    eventName: K,
    handler: (...args: M[K]) => void,
    options?: AddListenerOptions
  ) {
    if (!this.#eventsMap[eventName]) {
      // init
      this.#eventsMap[eventName] = []
    }
    const times = options?.times ?? Infinity
    const list = this.#eventsMap[eventName]
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

  removeListener<K extends keyof M>(
    eventName: K,
    handler?: (...args: M[K]) => void
  ) {
    if (this.#eventsMap[eventName]) {
      if (handler) {
        this.#eventsMap[eventName] = this.#eventsMap[eventName].filter(
          (item) => item.callback !== handler
        )
      } else {
        this.#eventsMap[eventName] = []
      }
    }
    return this
  }

  emit<K extends keyof M>(eventName: K, ...args: M[K]) {
    if (this.#eventsMap[eventName]) {
      this.#eventsMap[eventName] = this.#eventsMap[eventName].filter((item) => {
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
