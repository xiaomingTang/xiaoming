import EventEmitter from '@zimi/event-emitter'
import { easeInOutQuad } from './animations'

interface Options {
  /**
   * degree per clock cycle
   * 表示转动稳定后的速度(度 每 时钟周期)
   * @default 5
   */
  speedRatio?: number
  /**
   * 最小转动角度
   * (不转到该角度不会停, 即使 run 之后立马 shouldStopAtDeg)
   * @default 3600
   */
  minRunningDeg?: number
  /**
   * 开始时的缓动角度
   * (在该角度内慢慢加速至最大速度)
   * @WARNING 必须大于零(不能等于 0)
   * @default 540
   */
  easeStartDeg?: number
  /**
   * 停止时的缓动角度
   * (在该角度内慢慢减速至目标角度)
   * @WARNING 必须大于零(不能等于 0)
   * @default 540
   */
  easeStopDeg?: number
}

// 此处必须声明 type,
// 如果是 interface, 就必须 extends event-emitter 中的 EventsOverview,
// 而这会导致类型过泛, 不能被 event-emitter 中的 HandlersOf 识别
export type PrizeWheelEventsOverview = {
  start: []
  running: []
  end: []
}

/**
 * 幸运大转盘 逻辑部分
 */
export class PrizeWheel extends EventEmitter<PrizeWheelEventsOverview> {
  private rawDeg = -1

  /**
   * 当前角度
   */
  public get deg() {
    return this.rawDeg
  }

  // 禁止外部设置 deg 属性
  private set deg(value: number) {
    this.rawDeg = value
    this.emit('running')
  }

  /**
   * degree per clock cycle
   * 表示转动稳定后的速度(度 每 时钟周期)
   */
  speedRatio = 5

  /**
   * 最小转动角度
   */
  minRunningDeg = 3600

  /**
   * 开始时的缓动角度
   * @WARNING 必须大于零(不能等于 0)
   */
  easeStartDeg = 540

  /**
   * 停止时的缓动角度
   * @WARNING 必须大于零(不能等于 0)
   */
  easeStopDeg = 540

  private rawRunning = false

  /**
   * 是否正在转动
   */
  public get running() {
    return this.rawRunning
  }

  // 禁止外部设置 running 属性
  private set running(value: boolean) {
    if (value !== this.rawRunning) {
      this.rawRunning = value
      this.emit(value ? 'start' : 'end')
    } else {
      this.rawRunning = value
    }
  }

  /**
   * 期望停在哪个角度
   */
  private shouldStopAtDeg = -1

  constructor(options?: Options) {
    super()
    this.easeStartDeg = options?.easeStartDeg ?? this.easeStartDeg
    this.easeStopDeg = options?.easeStopDeg ?? this.easeStopDeg
    this.minRunningDeg = options?.minRunningDeg ?? this.minRunningDeg
    this.speedRatio = options?.speedRatio ?? this.speedRatio
  }

  /**
   * 启动大转盘
   * @WARNING 该方法会重置 shouldStopAtDeg;
   * 如果你调用了 shouldStopAt 方法后, 继续调用 run 方法,
   * 会导致前一个 shouldStopAt 方法失效;
   * (本当如此, 因为你先说停, 后说继续, 那本来就应该继续, 直到下一个 '停')
   */
  run() {
    this.shouldStopAtDeg = -1

    if (!this.running) {
      this.running = true
      // easeStartDeg 内的转动速度取决于 this.deg, 所以将 this.deg 降到 0-360
      const normalizedDeg = this.deg % 360
      this.deg = normalizedDeg
      this.animate()
    }
  }

  /**
   * 重置
   */
  reset() {
    this.shouldStopAtDeg = -1
    this.deg = -1
    this.running = false
  }

  /**
   * 外部如需停止转盘, 需要调用 shouldStopAt 方法
   */
  private end() {
    this.running = false
  }

  /**
   * 期望停在哪个角度
   * @param deg 0 - 360
   */
  shouldStopAt(deg: number) {
    // 防止输入有误, 手动限制到 0 - 360
    const clampedDeg = ((deg % 360) + 360) % 360
    this.shouldStopAtDeg = Math.max(
      this.deg + this.easeStopDeg,
      this.minRunningDeg
    )
    const delta = clampedDeg - (this.shouldStopAtDeg % 360)
    this.shouldStopAtDeg += delta >= 0 ? delta : delta + 360
  }

  private animate = () => {
    if (!this.running) {
      return
    }
    let speed: number
    if (
      this.shouldStopAtDeg >= 0 &&
      this.deg - (this.shouldStopAtDeg - this.easeStopDeg) >= 0
    ) {
      // 减速至停止
      speed = easeInOutQuad({
        currentTime: this.deg - (this.shouldStopAtDeg - this.easeStopDeg),
        targetTime: this.easeStopDeg,
        startValue: 1,
        endValue: 0.1,
      })
    } else {
      // 加速至匀速
      speed = easeInOutQuad({
        currentTime: this.deg,
        targetTime: this.easeStartDeg,
        startValue: 0.1,
        endValue: 1,
      })
    }
    this.deg += speed * this.speedRatio
    if (this.shouldStopAtDeg >= 0) {
      this.deg = Math.min(this.shouldStopAtDeg, this.deg)
    }
    if (this.shouldStopAtDeg < 0 || this.deg < this.shouldStopAtDeg) {
      if (typeof window !== 'undefined') {
        requestAnimationFrame(this.animate)
      } else {
        setTimeout(this.animate, 0)
      }
    } else {
      this.end()
    }
  }
}
