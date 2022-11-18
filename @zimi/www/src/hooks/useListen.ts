import { useEffect, useRef } from 'react'

/**
 * 监听响应式变量的变化
 * @param value 响应式变化(value 可能会被 setState 改变)
 * @param handler value 变化后的执行回调
 * ( prev 可能为空, value 第一次变化时, prev 为空)
 */
export default function useListen<T>(
  value: T,
  handler: (next: T, prev?: T) => void
) {
  const prevRef = useRef<T>()
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    handlerRef.current(value, prevRef.current)
    prevRef.current = value
  }, [value])
}
