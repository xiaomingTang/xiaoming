# @x_m/prize-wheel-helper

[@x_m/prize-wheel](../prize-wheel/README.md)的 react 辅助函数

### install
```
yarn add  @x_m/prize-wheel-helper @x_m/prize-wheel
```

### examples

``` typescript

import { PrizeWheel } from '@x_m/prize-wheel'
import { usePrizeWheelState } from '@x_m/prize-wheel-helper'

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
