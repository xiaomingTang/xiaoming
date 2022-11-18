import Script from 'next/script'
import { useMemo } from 'react'
import { ENV_CONFIG } from '@/config'

interface VConsoleProps {
  /**
   * - 如果置为 true, 则在非 production 环境下始终启用 vconsole
   * - 如果置为 false, 则不会启用 vconsole
   * - production 环境下始终不会启用 vconsole
   */
  enabled?: boolean
}

export default function VConsoleLoader({
  enabled = ENV_CONFIG.public.appEnv === 'development',
}: VConsoleProps) {
  const finalEnabled = useMemo(() => {
    const { nodeEnv, appEnv } = ENV_CONFIG.public
    if (
      nodeEnv === 'development' ||
      nodeEnv === 'test' ||
      appEnv === 'development'
    ) {
      return enabled ?? true
    }
    return false
  }, [enabled])

  if (!finalEnabled) {
    return <></>
  }
  return (
    <Script
      src='/scripts/vconsole.min.js'
      onLoad={() => {
        // eslint-disable-next-line no-new
        new window.VConsole()
      }}
    />
  )
}
