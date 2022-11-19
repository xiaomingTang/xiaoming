import { AppProps } from 'next/app'
import Providers from '@/providers'
import PolyfillVh from '@/polyfills/PolyfillVh'
import VConsoleLoader from '@/utils/VConsoleLoader'
import InjectEnv from '@/config/InjectEnv'
import '@/styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <PolyfillVh />
      <InjectEnv />
      <VConsoleLoader />
      <Component {...pageProps} />
    </Providers>
  )
}
