import Script from 'next/script'
import { getAppEnv } from '.'

export default function InjectEnv() {
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  return (
    <Script
      id='INJECT_APP_ENV'
      strategy='beforeInteractive'
      dangerouslySetInnerHTML={{
        __html: `window.NEXT_PUBLIC_APP_ENV = '${getAppEnv()}'`,
      }}
    />
  )
}
