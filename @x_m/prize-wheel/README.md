# prize-wheel

### examples

``` typescript

import { PrizeWheelLogic, usePrizeWheelState } from '../src/index'

/**
 * PrizeWheelLogic is 只负责逻辑部分,
 * 渲染转盘由使用者自己负责,
 * 因此可用于 react / vue / vanilla...
 */
const wheel = new PrizeWheelLogic({
  /**
   * degree per clock cycle
   * 表示转动稳定后的速度(度 每 时钟周期)
   * @default 5
   */
  speedRatio: 5,
  /**
   * 最小转动角度
   * (不转到该角度不会停, 即使 run 之后立马 shouldStopAtDeg)
   * @default 3600
   */
  minRunningDeg: 3600,
  /**
   * 开始时的缓动角度
   * (在该角度内慢慢加速至最大速度)
   * @WARNING 必须大于零(不能等于 0)
   * @default 540
   */
  easeStartDeg: 540,
  /**
   * 停止时的缓动角度
   * (在该角度内慢慢减速至目标角度)
   * @WARNING 必须大于零(不能等于 0)
   * @default 540
   */
  easeStopDeg: 540,
})

wheel.addListener('start', onStart)
// running will be triggered on every degree changed
wheel.addListener('running', onRunning)
wheel.addListener('end', onEnd)

wheel.run()

wheel.shouldStopAtDeg(any degree)

// in react
const { deg, running } = usePrizeWheelState(wheel)
// render your prize wheel with deg
CustomPrizeWheelRenderer(deg)

```
