import { noop } from 'lodash-es'

export interface ExactClickCheckerProps {
  /**
   * x/y 方向移动超过该值则认为不是 click;
   *
   * 负数 表示不考量该参数;
   *
   * @default 10
   */
  eps: number
  /**
   * 点击时间间隔超过该值则认为不是 click;
   *
   * 负数 表示不考量该参数;
   *
   * @default 500
   */
  durationMs: number
  /**
   * 是否允许移动后回到原处并触发 click;
   *
   * @default false
   */
  enableMoveAndBack: boolean
}

export interface Position {
  clientX: number
  clientY: number
}

function checkOutOfBounds(posA: Position, posB: Position, eps: number) {
  return (
    Math.abs(posA.clientX - posB.clientX) > eps ||
    Math.abs(posA.clientY - posB.clientY) > eps
  )
}

export class ExactClickChecker {
  private eps = 10

  private durationMs = 500

  private enableMoveAndBack = false

  private pointerList: {
    pos: Position
    time: number
  }[] = []

  private maxLeaveList: number[] = []

  private tempMaxLeave = 0

  /**
   * @example
   * ```typescript
   * const clickChecker = new ExactClickChecker()
   * clickChecker.bindEvents()
   *
   * // or mouseup / touchend / click / dblclick
   * canvas.addEventListener('pointerup', () => {
   *   if (clickChecker.checkIsClick()) {
   *     // is exact click
   *   }
   *   if (clickChecker.checkIsDoubleClick()) {
   *     // is exact double click
   *   }
   * })
   * ```
   */
  constructor(props?: Partial<ExactClickCheckerProps>) {
    this.set(props)
  }

  set(props?: Partial<ExactClickCheckerProps>) {
    this.eps = props?.eps ?? this.eps
    this.durationMs = props?.durationMs ?? this.durationMs
    this.enableMoveAndBack = props?.enableMoveAndBack ?? this.enableMoveAndBack
    return this
  }

  onPointerStart = (e: Position) => {
    this.maxLeaveList.unshift(this.tempMaxLeave)
    this.tempMaxLeave = 0
    this.pointerList.unshift({
      pos: {
        clientX: e.clientX,
        clientY: e.clientY,
      },
      time: Date.now(),
    })
  }

  onPointerEnd = (e: Position) => {
    this.maxLeaveList.unshift(this.tempMaxLeave)
    this.tempMaxLeave = 0
    this.pointerList.unshift({
      pos: {
        clientX: e.clientX,
        clientY: e.clientY,
      },
      time: Date.now(),
    })
  }

  onPointerMove = (e: Position) => {
    const lastPos = this.pointerList[0]?.pos
    if (!lastPos) {
      return
    }
    this.tempMaxLeave = Math.max(
      this.tempMaxLeave,
      Math.abs(e.clientX - lastPos.clientX),
      Math.abs(e.clientY - lastPos.clientY)
    )
  }

  /**
   * @returns unbindEvents
   */
  bindEvents = () => {
    if (typeof window === 'undefined') {
      return noop
    }
    window.removeEventListener('pointerdown', this.onPointerStart, true)
    window.removeEventListener('pointerup', this.onPointerEnd, true)
    window.removeEventListener('pointermove', this.onPointerMove, true)

    window.addEventListener('pointerdown', this.onPointerStart, true)
    window.addEventListener('pointerup', this.onPointerEnd, true)
    window.addEventListener('pointermove', this.onPointerMove, true)

    return () => {
      window.removeEventListener('pointerdown', this.onPointerStart, true)
      window.removeEventListener('pointerup', this.onPointerEnd, true)
      window.removeEventListener('pointermove', this.onPointerMove, true)
    }
  }

  private getProps(
    props?: Partial<ExactClickCheckerProps>
  ): ExactClickCheckerProps {
    return {
      eps: props?.eps ?? this.eps,
      durationMs: props?.durationMs ?? this.durationMs,
      enableMoveAndBack: props?.enableMoveAndBack ?? this.enableMoveAndBack,
    }
  }

  /**
   * @returns is exact click
   */
  checkIsClick = (props?: Partial<ExactClickCheckerProps>): boolean => {
    const { enableMoveAndBack, eps, durationMs } = this.getProps(props)
    const [pointerA, pointerB] = this.pointerList
    const [maxLeave] = this.maxLeaveList
    if (!pointerA || !pointerB || maxLeave === undefined) {
      return false
    }
    if (eps >= 0) {
      if (!enableMoveAndBack && maxLeave > eps) {
        return false
      }
      if (checkOutOfBounds(pointerA.pos, pointerB.pos, eps)) {
        return false
      }
    }
    if (durationMs >= 0 && pointerA.time - pointerB.time > durationMs) {
      return false
    }
    return true
  }

  /**
   * @returns is exact double click
   */
  checkIsDoubleClick = (props?: Partial<ExactClickCheckerProps>): boolean => {
    const { enableMoveAndBack, eps, durationMs } = this.getProps(props)
    const [pointerA, pointerB, pointerC, pointerD] = this.pointerList
    const [maxLeaveA, maxLeaveB, maxLeaveC] = this.maxLeaveList
    if (
      !pointerA ||
      !pointerB ||
      !pointerC ||
      !pointerD ||
      maxLeaveA === undefined ||
      maxLeaveB === undefined ||
      maxLeaveC === undefined
    ) {
      return false
    }
    const maxLeave = Math.max(maxLeaveA, maxLeaveB, maxLeaveC)
    if (eps >= 0) {
      if (!enableMoveAndBack && maxLeave > eps) {
        return false
      }
      if (checkOutOfBounds(pointerA.pos, pointerB.pos, eps)) {
        return false
      }
    }
    if (
      durationMs >= 0 &&
      (pointerA.time - pointerB.time > durationMs ||
        pointerB.time - pointerC.time > durationMs ||
        pointerC.time - pointerD.time > durationMs)
    ) {
      return false
    }
    return true
  }
}
