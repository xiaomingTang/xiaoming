type PromisedFunc<T> = () => Promise<T>

/**
 * 能缓存 promise, 确保 promise 在被多次调用时仅执行一次,
 * 其余的调用都会返回缓存的 promise;
 * promise resolved 之后, 继续调用会返回缓存的值(值不能是 undefined);
 * promise rejected 之后, 继续调用会重新执行 promise;
 * @param promise will be called only once forever, unless rejected
 * @example
 * ``` typescript
 * const promiseOnce = genePromiseOnce(expensiveButStorableAsyncFunction)
 *
 * window.addEventListener('resize', () => {
 *   promiseOnce()
 *     .then((res) => {
 *       console.log(`promise successed: ${res}`)
 *     })
 *     .catch(() => {
 *       console.log('catch')
 *     })
 * })
 * ```
 */
export function genePromiseOnce<T>(promise: PromisedFunc<T>): PromisedFunc<T> {
  let cachedResult: T | undefined
  let cachedPromise: Promise<T> | undefined

  return async () => {
    if (typeof cachedResult !== 'undefined') {
      return cachedResult
    }
    if (cachedPromise) {
      return cachedPromise
    }
    cachedPromise = promise()
      .then((res) => {
        cachedResult = res
        return res
      })
      .finally(() => {
        cachedPromise = undefined
      })
    return cachedPromise
  }
}
