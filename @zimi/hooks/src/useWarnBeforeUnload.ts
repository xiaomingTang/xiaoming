import { useEffect } from 'react'

/**
 * show a confirmation dialog before page unload (beforeunload event, NOT component unload);
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 */
export function useWarnBeforeUnload() {
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'before unload'
      return 'before unload'
    }
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])
}
