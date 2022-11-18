import { noop } from 'lodash-es'
import { useRouter } from 'next/router'
import { DependencyList, EffectCallback, useEffect } from 'react'

export default function useEffectAfterQueryReady(
  effect: EffectCallback,
  deps: DependencyList = []
) {
  const { isReady } = useRouter() || {}

  useEffect(() => {
    if (isReady) {
      return effect()
    }
    return noop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, isReady])
}
