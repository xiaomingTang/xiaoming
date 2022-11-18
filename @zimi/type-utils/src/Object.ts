/* eslint-disable @typescript-eslint/no-explicit-any */

export type ObjKey = string | number | symbol

export type AnyObj = Record<ObjKey, any>

export type ValueOf<Obj extends AnyObj> = Obj extends any
  ? Obj[keyof Obj]
  : never
