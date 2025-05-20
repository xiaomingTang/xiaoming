type OnPopState = () => void | Promise<void>

const KEY = '@zimi/history-state-manager' as const

let initialized = false
const onPopStateCallbacks = [] as OnPopState[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isZimiHistoryState(state: any): state is {
  type: typeof KEY
} {
  return state?.type === KEY
}

/**
 * @example
 * ``` tsx
 * // you should call this function as early as possible
 * // WARNING: this function includes `window.history.replaceState(xxx)`
 * historyStateManager.init()
 *
 * function App() {
 *   const [num, setNum] = useState(0)
 *   return (
 *     <Button
 *       onClick={() => {
 *         setNum((prev) => prev + 1)
 *         historyStateManager.push(async () => {
 *           if (window.confirm('Are you sure?')) {
 *             setNum((prev) => prev - 1)
 *           } else {
 *             Toastify({ text: 'User rejected' }).showToast()
 *             throw new Error('reject')
 *           }
 *         })
 *       }}
 *     >
 *       {num}
 *     </Button>
 *   )
 * }
 * ```
 */
export const historyStateManager = {
  /**
   * you should call this function as early as possible
   * @WARNING this function includes `window.history.replaceState(xxx)`
   */
  init: () => {
    if (initialized || typeof window === 'undefined') {
      return
    }
    initialized = true
    // 初始化
    window.history.replaceState({ type: KEY }, '')

    window.addEventListener('popstate', async (e) => {
      if (!isZimiHistoryState(e.state)) {
        return
      }
      const lastCallback = onPopStateCallbacks.pop()
      if (!lastCallback) {
        return
      }
      try {
        await lastCallback()
      } catch (_) {
        onPopStateCallbacks.push(lastCallback)
        window.history.pushState({ type: KEY }, '')
        return
      }
      if (onPopStateCallbacks.length > 0) {
        window.history.pushState({ type: KEY }, '')
      }
    })
  },
  push: (onPopState: OnPopState) => {
    if (!initialized) {
      console.warn(
        '[historyStateManager]: you should call init() before push()'
      )
    }
    if (onPopStateCallbacks.length === 0) {
      window.history.pushState({ type: KEY }, '')
    }
    onPopStateCallbacks.push(onPopState)
  },
}
