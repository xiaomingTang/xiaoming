export interface NextParams {
  [key: string]: string | string[] | undefined
}

export interface NextSearchParams {
  [key: string]: string | string[] | undefined
}

export interface NextPageProps<
  P extends NextParams = NextParams,
  S extends NextSearchParams = NextSearchParams
> {
  params?: P
  searchParams?: S
}

export interface NextLayoutProps<P extends NextParams = NextParams> {
  params?: P
  children: React.ReactNode
}

export interface NextHeadProps<P extends NextParams = NextParams> {
  params?: P
  children: React.ReactNode
}

export interface NextErrorProps {
  error: Error
  reset: () => void
}

export type GenerateStaticParamsFunc<T extends NextParams> = (
  params?: T
) => Promise<Record<string, string | string[]>[]>

// https://github.com/sindresorhus/type-fest
export type Numeric = number | bigint
type Zero = 0 | 0n
export type Negative<T extends Numeric> = T extends Zero
  ? never
  : `${T}` extends `-${string}`
  ? T
  : never
export type NonNegative<T extends Numeric> = T extends Zero
  ? T
  : Negative<T> extends never
  ? T
  : never
