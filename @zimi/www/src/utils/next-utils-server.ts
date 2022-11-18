/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import 'server-only'
import {
  GenerateStaticParamsFunc,
  NextHeadProps,
  NextLayoutProps,
  NextPageProps,
  NextParams,
  NextSearchParams,
  NonNegative,
  Numeric,
} from './next-utils-type'

export function NextPage<
  T extends NextParams = Record<never, never>,
  S extends NextSearchParams = Record<never, never>
>(
  page: (
    props: NextPageProps<T, S>
  ) => React.ReactNode | Promise<React.ReactNode>
) {
  return page as (props: any) => ReturnType<typeof page>
}

export function NextLayout<T extends NextParams = Record<never, never>>(
  layout: (
    props: NextLayoutProps<T>
  ) => React.ReactNode | Promise<React.ReactNode>
) {
  return layout as (props: any) => ReturnType<typeof layout>
}

export function NextHead<T extends NextParams = Record<never, never>>(
  head: (props: NextHeadProps<T>) => React.ReactNode | Promise<React.ReactNode>
) {
  return head as (props: any) => ReturnType<typeof head>
}

export function NextNotFound(notFount: () => React.ReactNode) {
  return notFount as (props: any) => ReturnType<typeof notFount>
}

export const NextEntry = {
  config: (config?: Record<string, any>) => config,
  generateStaticParams: <T extends NextParams = NextParams>(
    generateStaticParams?: GenerateStaticParamsFunc<T>
  ) => generateStaticParams,
  revalidate: <
    T extends Numeric | undefined,
    S extends T extends undefined ? T : NonNegative<NonNullable<T>>
  >(
    n: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    REVALIDATE_MUST_BE_NON_NEGATIVE: S extends T
      ? 'sec'
      : 'REVALIDATE_MUST_BE_NON_NEGATIVE'
  ) => n,
  dynamic: (dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static') =>
    dynamic,
  dynamicParams: (dynamicParams?: boolean) => dynamicParams,
  fetchCache: (
    fetchCache?:
      | 'auto'
      | 'force-no-store'
      | 'only-no-store'
      | 'default-no-store'
      | 'default-cache'
      | 'only-cache'
      | 'force-cache'
  ) => fetchCache,
  preferredRegion: (preferredRegion?: 'auto' | 'home' | 'edge') =>
    preferredRegion,
  layout: {
    default: NextLayout,
  },
  page: {
    default: NextPage,
    runtime: (runtime?: 'nodejs' | 'experimental-edge') => runtime,
  },
  head: {
    default: NextHead,
  },
  notFount: {
    default: NextNotFound,
  },
}
