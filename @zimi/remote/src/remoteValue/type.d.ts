type HasFunc<T> = T extends (...args: unknown[]) => unknown
  ? true
  : T extends unknown[]
    ? { [K in keyof T]: HasFunc<T[K]> }[number] extends false
      ? false
      : true
    : T extends object
      ? { [K in keyof T]: HasFunc<T[K]> }[keyof T] extends false
        ? false
        : true
      : false

export type ToFunc<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Ret
    ? (...args: Args) => Promise<Awaited<Ret>>
    : HasFunc<T[K]> extends false
      ? () => Promise<T[K]>
      : T[K] extends object
        ? ToFunc<T[K]>
        : never
}

type Assert<T extends true> = T

interface TestObj {
  a1: number
  a2: number[]
  a3: [number, string]
  a4: {
    b: number
    c: [string]
  }
  a5: () => Promise<number>
  a6: () => Promise<number[]>
  a7: () => Promise<[number, string]>
  b: {
    b1: number
    b2: number[]
    b3: [number, string]
    b4: () => {
      b: number
      c: [string]
    }
    b5: () => Promise<number>
    b6: () => Promise<number[]>
    b7: () => Promise<[number, string]>
  }
  f: {
    b: number
    c: {
      d: () => number
    }
  }
}

export type TestA1 = Assert<
  ToFunc<TestObj>['a1'] extends () => Promise<number> ? true : false
>
export type TestA2 = Assert<
  ToFunc<TestObj>['a2'] extends () => Promise<number[]> ? true : false
>
export type TestA3 = Assert<
  ToFunc<TestObj>['a3'] extends () => Promise<[number, string]> ? true : false
>
export type TestA4 = Assert<
  ToFunc<TestObj>['a4'] extends () => Promise<{
    b: number
    c: [string]
  }>
    ? true
    : false
>
export type TestA5 = Assert<
  ToFunc<TestObj>['a5'] extends () => Promise<number> ? true : false
>
export type TestA6 = Assert<
  ToFunc<TestObj>['a6'] extends () => Promise<number[]> ? true : false
>
export type TestA7 = Assert<
  ToFunc<TestObj>['a7'] extends () => Promise<[number, string]> ? true : false
>
export type TestB1 = Assert<
  ToFunc<TestObj>['b']['b1'] extends () => Promise<number> ? true : false
>
export type TestB2 = Assert<
  ToFunc<TestObj>['b']['b2'] extends () => Promise<number[]> ? true : false
>
export type TestB3 = Assert<
  ToFunc<TestObj>['b']['b3'] extends () => Promise<[number, string]> ? true : false
>
export type TestB4 = Assert<
  ToFunc<TestObj>['b']['b4'] extends () => Promise<{
    b: number
    c: [string]
  }>
    ? true
    : false
>
export type TestB5 = Assert<
  ToFunc<TestObj>['b']['b5'] extends () => Promise<number> ? true : false
>
export type TestB6 = Assert<
  ToFunc<TestObj>['b']['b6'] extends () => Promise<number[]> ? true : false
>
export type TestB7 = Assert<
  ToFunc<TestObj>['b']['b7'] extends () => Promise<[number, string]> ? true : false
>
export type TestF = Assert<
  ToFunc<TestObj>['f']['b'] extends () => Promise<number> ? true : false
>
export type TestF2 = Assert<
  ToFunc<TestObj>['f']['c']['d'] extends () => Promise<number> ? true : false
>
