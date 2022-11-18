import EventEmitter from '@zimi/event-emitter/src'
import { Interact, InteractEvents, Point } from './types'

interface TouchFormatterProps {
  enableMove?: boolean
  enableScale?: boolean
  enableRotate?: boolean
  /**
   * 每次触发 move 事件, 移动的倍率
   * @default 1
   */
  ratioOfMove?: number
  /**
   * 每次触发 rotate 事件, 旋转的角度(degree)
   * @default 1
   */
  ratioOfRotate?: number
}

function vectorOf(src: Point, tar: Point): Point {
  return {
    x: tar.x - src.x,
    y: tar.y - src.y,
  }
}

function distanceOf(posA: Point, posB: Point): number {
  return Math.sqrt((posA.x - posB.x) ** 2 + (posA.y - posB.y) ** 2)
}

function centerOf(...posArr: Point[]): Point {
  let x = 0
  let y = 0
  posArr.forEach((pos) => {
    x += pos.x
    y += pos.y
  })
  return {
    x: x / posArr.length,
    y: y / posArr.length,
  }
}

export class TouchFormatter
  extends EventEmitter<InteractEvents>
  implements Interact
{
  private element: HTMLElement | null = null

  private hasTouchStart = false

  private touchAPos: Point = {
    x: -1,
    y: -1,
  }

  private touchBPos: Point = {
    x: -1,
    y: -1,
  }

  private syncTouches = (e: TouchEvent) => {
    const [touchA, touchB] = e.touches
    if (touchA) {
      this.touchAPos.x = touchA.clientX
      this.touchAPos.y = touchA.clientY
    }
    if (touchB) {
      this.touchBPos.x = touchB.clientX
      this.touchBPos.y = touchB.clientY
    }
  }

  private onTouchStart = (e: TouchEvent) => {
    this.hasTouchStart = true
    e.preventDefault()
    this.syncTouches(e)
  }

  private onGlobalTouchStart = (e: TouchEvent) => {
    if (this.hasTouchStart) {
      e.preventDefault()
      this.syncTouches(e)
    }
  }

  private onTouchMove = (e: TouchEvent) => {
    const [touchA, touchB] = e.touches

    if (!touchA || !this.hasTouchStart) {
      // unexpected error
      return
    }

    if (this.enableMove) {
      if (touchB) {
        const dax = touchA.clientX - this.touchAPos.x
        const dbx = touchB.clientX - this.touchBPos.x
        // 异号则求和
        let x = dax + dbx
        // 将要缩放则还需要(仅在异号时需要)除以 2
        if (this.enableScale) {
          x /= 2
        }
        // 同号则取靠近 0 的那一个
        if (dax * dbx > 0) {
          x = Math.abs(dax) < Math.abs(dbx) ? dax : dbx
        }
        const day = touchA.clientY - this.touchAPos.y
        const dby = touchB.clientY - this.touchBPos.y
        // 异号则求和
        let y = day + dby
        // 将要缩放则还需要(仅在异号时需要)除以 2
        if (this.enableScale) {
          y /= 2
        }
        // 同号则取靠近 0 的那一个
        if (day * dby > 0) {
          y = Math.abs(day) < Math.abs(dby) ? day : dby
        }
        this.emit('move', {
          x,
          y,
        })
      } else {
        this.emit('move', {
          x: touchA.clientX - this.touchAPos.x,
          y: touchA.clientY - this.touchAPos.y,
        })
      }
    }

    if (touchA && touchB && (this.enableRotate || this.enableScale)) {
      const posA: Point = {
        x: touchA.clientX,
        y: touchA.clientY,
      }

      const posB: Point = {
        x: touchB.clientX,
        y: touchB.clientY,
      }

      if (this.enableScale) {
        this.emit('scale', {
          center: centerOf(posA, posB, this.touchAPos, this.touchBPos),
          ratio:
            distanceOf(posA, posB) / distanceOf(this.touchAPos, this.touchBPos),
        })
      }

      if (this.enableRotate) {
        const newVec = vectorOf(posA, posB)
        const oldVec = vectorOf(this.touchAPos, this.touchBPos)

        let theta =
          Math.atan2(newVec.y, newVec.x) - Math.atan2(oldVec.y, oldVec.x)
        if (theta > Math.PI) {
          theta -= Math.PI * 2
        }
        if (theta < -Math.PI) {
          theta += Math.PI * 2
        }
        this.emit('rotate', {
          center: centerOf(posA, posB),
          ratio: theta,
        })
      }
    }

    this.syncTouches(e)
  }

  private onTouchEnd = (e: TouchEvent) => {
    this.syncTouches(e)
    if (e.touches.length === 0) {
      this.hasTouchStart = false
    }
  }

  enableMove: boolean

  enableScale: boolean

  enableRotate: boolean

  constructor(options?: TouchFormatterProps) {
    super()
    this.enableMove = options?.enableMove ?? true
    this.enableScale = options?.enableScale ?? true
    this.enableRotate = options?.enableRotate ?? true
  }

  attach(element: HTMLElement) {
    this.element = element
    this.element.addEventListener('touchstart', this.onTouchStart, {
      // touchstart 一定会调用 preventDefault
      passive: false,
    })
    window.addEventListener('touchstart', this.onGlobalTouchStart, {
      // touchstart 一定会调用 preventDefault
      passive: false,
    })
    window.addEventListener('touchmove', this.onTouchMove)
    window.addEventListener('touchend', this.onTouchEnd)
  }

  detach() {
    this.element?.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchstart', this.onGlobalTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
    this.element = null
  }
}
