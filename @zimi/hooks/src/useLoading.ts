import clamp from 'lodash/clamp'
import { useCallback, useState } from 'react'

const InfiniteTimeout = 2 ** 31 - 1

/**
 * 同一个 withLoading 可以包装多个函数,
 * 同一个 withLoading 包装的所有函数全部执行完毕后才会关闭 loading;
 *
 * @usage
 * ```tsx
 * function Comp() {
 *   const [loading, withLoading] = useLoading()
 *
 *   const { data } = useSWR('xxx', withLoading(asyncTask1))
 *
 *   return <>
 *     <Spin spinning={loading} />
 *
 *     <Button
 *       onClick={withLoading(asyncTask2)}
 *     >
 *       async task
 *     </Button>
 *   </>
 * }
 * ```
 */
export function useLoading() {
  const [flag, setFlag] = useState(0)

  /**
   * @param fn 需要包装的函数
   * @param delayMs 延迟显示 loading (!!! 而非延迟执行函数)
   */
  const withLoading = useCallback(
    <Arg extends unknown[], Res>(
      fn: (...args: Arg) => Res | Promise<Res>,
      delayMs = 300
    ) =>
      async (...args: Arg) => {
        let timer = -1
        if (delayMs > 0) {
          timer = +setTimeout(
            () => {
              timer = -1
              setFlag((prev) => prev + 1)
            },
            clamp(delayMs, 0, InfiniteTimeout)
          )
        } else {
          setFlag((prev) => prev + 1)
        }
        try {
          return await fn(...args)
        } finally {
          clearTimeout(timer)
          if (timer < 0) {
            setFlag((prev) => prev - 1)
          }
        }
      },
    []
  )

  return [flag > 0, withLoading] as const
}
