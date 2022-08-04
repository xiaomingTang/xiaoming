# @x_m/prize-wheel-helper

### install
```
yarn add @x_m/prize-wheel-helper
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
