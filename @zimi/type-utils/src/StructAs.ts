/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AnyObj, ValueOf } from './Object'

// @TODO: to be fixed...
type PreStruct<
  Obj extends AnyObj,
  Key extends keyof Obj,
  KeyName extends string,
  ValueName extends string
> = Obj extends any
  ? {
      [k in Key]: {
        [s in KeyName]: k
      } & {
        [t in ValueName]: Obj[k]
      }
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
 * type StructedGroup = StructAs<Group, 'type', 'value'>
 *
 * StructedGroup is {
 *   type: 'num'
 *   value: number[]
 * } | {
 *   type: 'str'
 *   value: string[]
 * } | {
 *   type: 'boo'
 *   value: boolean[]
 * }
 * ```
 */
export type StructAs<
  Obj extends AnyObj,
  KeyName extends string,
  ValueName extends string
> = Obj extends any
  ? ValueOf<PreStruct<Obj, keyof Obj, KeyName, ValueName>>
  : never
