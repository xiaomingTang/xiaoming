/* eslint-disable @typescript-eslint/no-explicit-any */

export type ObjKey = string | number | symbol

export type AnyObj = Record<ObjKey, any>

export type EmptyObj = Record<ObjKey, never>

export type ValueOf<Obj extends AnyObj> = Obj extends any
  ? Obj[keyof Obj]
  : never

/**
 * @example
 *
 * PickByKeys<{
 *   a: string
 *   b: number
 *   c: boolean
 * }, 'a' | 'b'>
 *
 * // expect:
 * // {
 * //   a: string
 * //   b: number
 * //   c?: undefined
 * // }
 */
export type PickByKeys<Obj extends AnyObj, Key> = Obj extends any
  ? {
      [k in Exclude<keyof Obj, Key>]?: undefined
    } & {
      [k in Extract<keyof Obj, Key>]: Obj[k]
    }
  : never

export type Assign<A extends AnyObj, B extends AnyObj> = A extends AnyObj
  ? {
      [K in Exclude<keyof A, keyof B>]: A[K]
    } & {
      [K in Extract<keyof A, keyof B>]: B[K] extends undefined ? A[K] : B[K]
    } & {
      [K in Exclude<keyof B, keyof A>]: B[K]
    }
  : never
