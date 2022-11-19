/* eslint-disable @typescript-eslint/no-explicit-any */

// https://dev.to/maxime1992/implement-a-generic-oneof-type-with-typescript-22em

import type { AnyObj, ValueOf } from './Object'

type PickByKeys<Obj extends AnyObj, Key extends keyof Obj> = Obj extends any
  ? {
      [k in Exclude<keyof Obj, Key>]?: never
    } & {
      [k in Key]: Obj[k]
    }
  : never

type PickIntoKey<Obj extends AnyObj> = Obj extends any
  ? {
      [key in keyof Obj]: PickByKeys<Obj, key>
    }
  : never

/**
 * @example
 * ```typescript
 * interface Group {
 *   num: number[]
 *   str: string[]
 *   boo: boolean[]
 * }
 *
 * type PickOneOfGroup = PickOneOf<Group>
 *
 * PickOneOfGroup is {
 *   num: number[]
 *   str: undefined
 *   boo: undefined
 * } | {
 *   num: undefined
 *   str: string[]
 *   boo: undefined
 * } | {
 *   num: undefined
 *   str: undefined
 *   boo: boolean[]
 * }
 * ```
 */
export type PickOneOf<Obj> = Obj extends AnyObj
  ? ValueOf<PickIntoKey<Obj>>
  : never
