/* eslint-disable @typescript-eslint/no-explicit-any */

interface NextParams {
  [key: string]: string | string[] | undefined
}

interface NextSearchParams {
  [key: string]: string | string[] | undefined
}

interface NextPageProps<
  P extends NextParams = NextParams,
  S extends NextSearchParams = NextSearchParams
> {
  params?: P
  searchParams?: S
}

interface NextLayoutProps<P extends NextParams = NextParams> {
  params?: P
  children: React.ReactNode
}

interface NextHeadProps<P extends NextParams = NextParams> {
  params?: P
  children: React.ReactNode
}

interface NextErrorProps {
  error: Error
  reset: () => void
}

type GenerateStaticParamsFunc<T extends NextParams> = (
  params?: T
) => Promise<Record<string, string | string[]>[]>

// https://github.com/sindresorhus/type-fest
type Numeric = number | bigint
type Zero = 0 | 0n
type Negative<T extends Numeric> = T extends Zero
  ? never
  : `${T}` extends `-${string}`
  ? T
  : never
type NonNegative<T extends Numeric> = T extends Zero
  ? T
  : Negative<T> extends never
  ? T
  : never

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

export function NextError(error: (props: NextErrorProps) => React.ReactNode) {
  return error as (props: any) => ReturnType<typeof error>
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
  error: {
    default: NextError,
  },
  notFount: {
    default: NextNotFound,
  },
}
