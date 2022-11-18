# @zimi/prize-wheel-helper

[@zimi/prize-wheel](../prize-wheel/README.md)的 react 辅助函数

### install
```
yarn add  @zimi/prize-wheel-helper @zimi/prize-wheel
```

### examples

``` typescript

import { PrizeWheel } from '@zimi/prize-wheel'
import { usePrizeWheelState } from '@zimi/prize-wheel-helper'

/**
 * PrizeWheel 只负责逻辑部分,
 * 渲染转盘由使用者自己负责,
 * 因此可用于 react / vue / vanilla / node...
 */
const wheel = new PrizeWheel()

// in react
const { deg, running } = usePrizeWheelState(wheel)
// render your prize wheel with deg
CustomPrizeWheelRenderer(deg)

wheel.run()

wheel.shouldStopAtDeg(any degree)

```
