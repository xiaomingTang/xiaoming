import { ForwardedRef, useEffect, useRef } from 'react'

/**
 * https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 * @example
 * ``` tsx
 * const MeaturedInput = forwardRef<HTMLInputElement>((props, ref) => {
 *   const innerRef = useCombinedRefs(ref)
 *
 *   useEffect(() => {
 *     console.log(innerRef.current?.getBoundingClientRect())
 *   }, [innerRef])
 *
 *   return <input ref={innerRef} />
 * })
 * ```
 */
export function useCombinedRefs<T>(...refs: ForwardedRef<T>[]) {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return
      }
      if (ref instanceof Function) {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = targetRef.current
      }
    })
    /**
     * refs 是 spread 操作符生成的数组,
     * 所以此处使用 ...refs 作为依赖
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refs])

  return targetRef
}
