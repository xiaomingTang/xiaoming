import { AnyObj, Assign, PickByKeys } from './Object'

/**
 * @example
 *
 * interface StringObj {
 *   a: string
 *   b: string
 * }
 *
 * interface NumberObj {
 *   b: number
 *   c: number
 * }
 *
 * function test1(input: StringObj | NumberObj) {
 *   // error: Property 'c' does not exist on type 'StringObj'.ts(2339)
 *   if (typeof input.c === 'number') {
 *     console.log(input.b)
 *   }
 * }
 *
 * function test2(input: Or<StringObj, NumberObj>) {
 *   if (typeof input.c === 'number') {
 *     // correct: input.b is number
 *     console.log(input.b)
 *   }
 * }
 */
export type Or<A extends AnyObj, B extends AnyObj> =
  | PickByKeys<Assign<A, B>, keyof B>
  | PickByKeys<Assign<B, A>, keyof A>
