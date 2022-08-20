# @x_m/type-utils

typescript 类型辅助函数

### install
```
yarn add @x_m/type-utils
```

### examples

[PickOneOf](#PickOneOf)    
[StructAs](#StructAs)    

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
[↑ examples ↑](#examples)

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
[↑ examples ↑](#examples)
