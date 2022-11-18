import { ForwardedRef, useEffect, useRef } from 'react'

/**
 * https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */
export default function useCombinedRefs<T>(...refs: ForwardedRef<T>[]) {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (ref instanceof Function) {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = targetRef.current
      }
    })
    // refs 是 spread 操作符生成的数组,
    // 外部无关组件更新时其始终为更新值,
    // 会造成无谓的更新, 所以此处将 ...refs 作为依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refs])

  return targetRef
}
