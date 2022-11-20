import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import dayjsLocal from 'dayjs/plugin/localizedFormat'
import dayjsUtc from 'dayjs/plugin/utc'
import Providers from '@/providers'
import PolyfillVh from '@/polyfills/PolyfillVh'
import VConsoleLoader from '@/utils/VConsoleLoader'
import InjectEnv from '@/config/InjectEnv'
import '@/styles/global.scss'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsLocal)

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
