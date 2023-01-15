# @zimi/type-utils

typescript 类型辅助函数

### install
```
yarn add @zimi/type-utils
```

### examples

[PickOneOf](#PickOneOf)    
[StructAs](#StructAs)    
[Or](#Or)    

---

#### PickOneOf
from: [https://dev.to/maxime1992/implement-a-generic-oneof-type-with-typescript-22em](https://dev.to/maxime1992/implement-a-generic-oneof-type-with-typescript-22em)

``` typescript
interface Group {
  num: number[]
  str: string[]
  boo: boolean[]
}

/**
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
 */
type PickOneOfGroup = PickOneOf<Group>
```
[↑ all examples ↑](#examples)

#### StructAs

``` typescript

interface Group {
  num: number[]
  str: string[]
  boo: boolean[]
}

/**
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
  */
type StructedGroup = StructAs<Group, 'type', 'value'>

```
[↑ all examples ↑](#examples)

#### Or

``` typescript

interface StringObj {
  a: string
  b: string
}

interface NumberObj {
  b: number
  c: number
}

function test1(input: StringObj | NumberObj) {
  // error: Property 'c' does not exist on type 'StringObj'.ts(2339)
  if (typeof input.c === 'number') {
    console.log(input.b)
  }
}

function test2(input: Or<StringObj, NumberObj>) {
  if (typeof input.c === 'number') {
    // correct: input.b is number
    console.log(input.b)
  }
}

```
[↑ all examples ↑](#examples)
