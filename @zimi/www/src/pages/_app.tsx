import { AppProps } from 'next/app'
import Providers from '@/providers'
import { usePolyfillVh } from '@/polyfills/usePolyfillVh'
import VConsoleLoader from '@/utils/VConsoleLoader'
import InjectEnv from '@/config/InjectEnv'
import '@/styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  usePolyfillVh()

  return (
    <Providers>
      <InjectEnv />
      <VConsoleLoader />
      <Component {...pageProps} />
    </Providers>
  )
}
