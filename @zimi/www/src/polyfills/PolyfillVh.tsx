import { useEffect } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

export default function PolyfillVh() {
  const { height } = useWindowSize('inner')
  useEffect(() => {
    if (height > 0) {
      document.documentElement.style.setProperty('--vh', `${height / 100}px`)
    }
  }, [height])

  return <></>
}
