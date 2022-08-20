import EventEmitter from '@x_m/event-emitter'
import './inputdevicecapabilities-polyfill.js'
import { Interact, InteractEvents } from './types'

/**
 * 仅表意, left 仅指代右手键盘的 鼠标左键, 其他同理
 */
enum MouseButton {
  left = 0,
  middle = 1,
  right = 2,
  back = 3,
  forward = 4,
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 */
type ButtonType = 0 | 1 | 2 | 3 | 4

interface MouseFormatterProps {
  enableMove?: boolean
  enableScale?: boolean
  enableRotate?: boolean
  /**
   * 每次触发 move 事件, 移动的倍率
   * @default 1
   */
  ratioOfMove?: number
  /**
   * 每次触发 scale(wheel) 事件, 缩放的倍率
   * @default 1.1
   */
  ratioOfScale?: number
  /**
   * 每次触发 rotate(wheel) 事件, 旋转的角度(degree)
   * @default 15
   */
  ratioOfRotate?: number
  /**
   * which button triggers move event;
   * button type:
   * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
   * @default 0
   * means left button
   */
  mouseButtonOfMove?: ButtonType
  /**
   * if shift-required,
   * then 'shift + wheel' will trigger scale event,
   * and 'wheel only' will trigger rotate event.
   * @default 'middle-button-only'
   */
  mouseButtonOfScale?: 'shift-required' | 'middle-button-only'
  /**
   * IF AND ONLY IF TouchFormatter be used at the same time,
   * HIGHLY recommended disabledWhenFiresTouchEvents be true.
   * learn more: https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceCapabilities/firesTouchEvents
   * @default false
   */
  disabledWhenFiresTouchEvents?: boolean
}

export class MouseFormatter
  extends EventEmitter<InteractEvents>
  implements Interact
{
  private element: HTMLElement | null = null

  private isMoving = false

  private onMouseDown = (e: MouseEvent) => {
    if (
      this.disabledWhenFiresTouchEvents &&
      e.sourceCapabilities?.firesTouchEvents
    ) {
      return
    }
    if (!this.enableMove || e.button !== this.mouseButtonOfMove) {
      return
    }
    this.isMoving = true
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.enableMove || !this.isMoving) {
      return
    }
    e.preventDefault()
    this.emit('move', {
      x: e.movementX * this.ratioOfMove,
      y: e.movementY * this.ratioOfMove,
    })
  }

  private onMouseUp = () => {
    this.isMoving = false
  }

  private onWheel = (e: WheelEvent) => {
    const center = {
      x: e.clientX,
      y: e.clientY,
    }
    if (
      this.enableScale &&
      !!e.shiftKey === (this.mouseButtonOfScale === 'shift-required')
    ) {
      this.emit('scale', {
        ratio: e.deltaY > 0 ? 1 / this.ratioOfScale : this.ratioOfScale,
        center,
      })
    }
    if (
      this.enableRotate &&
      !!e.shiftKey !== (this.mouseButtonOfScale === 'shift-required')
    ) {
      this.emit('rotate', {
        ratio:
          e.deltaY > 0
            ? (this.ratioOfRotate * Math.PI) / 180
            : -(this.ratioOfRotate * Math.PI) / 180,
        center,
      })
    }
  }

  enableMove: boolean

  enableScale: boolean

  enableRotate: boolean

  /**
   * which button triggers move event;
   * button type:
   * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
   * @default 0
   * means main button (usually is left button)
   */
  mouseButtonOfMove: ButtonType

  /**
   * if shift-required,
   * then 'shift + wheel' will trigger scale event,
   * and 'wheel only' will trigger rotate event.
   * @default 'middle-button-only'
   */
  mouseButtonOfScale: 'shift-required' | 'middle-button-only'

  /**
   * 每次触发 move 事件, 移动的倍率
   * @default 1
   */
  ratioOfMove: number

  /**
   * 每次触发 scale(wheel) 事件, 缩放的倍率
   * @default 1.1
   */
  ratioOfScale: number

  /**
   * 每次触发 rotate(wheel) 事件, 旋转的角度(degree)
   * @default 15
   */
  ratioOfRotate: number

  /**
   * IF AND ONLY IF TouchFormatter be used at the same time,
   * HIGHLY recommended disabledWhenFiresTouchEvents be true.
   * learn more: https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceCapabilities/firesTouchEvents
   * @default false
   */
  disabledWhenFiresTouchEvents: boolean

  /**
   * 使用者可自行添加倍率
   */
  constructor(options?: MouseFormatterProps) {
    super()
    this.enableMove = options?.enableMove ?? true
    this.enableScale = options?.enableScale ?? true
    this.enableRotate = options?.enableRotate ?? true
    this.ratioOfMove = options?.ratioOfMove ?? 1
    this.ratioOfScale = options?.ratioOfScale ?? 1.1
    this.ratioOfRotate = options?.ratioOfRotate ?? 15
    this.disabledWhenFiresTouchEvents =
      options?.disabledWhenFiresTouchEvents ?? false
    this.mouseButtonOfMove = options?.mouseButtonOfMove ?? MouseButton.left
    this.mouseButtonOfScale =
      options?.mouseButtonOfScale ?? 'middle-button-only'
  }

  attach(element: HTMLElement) {
    if (!element) {
      console.error('[interact] element required')
      return
    }

    this.element = element
    /**
     * mouseup bind on window, instead of body;
     * as window mouseup event can be triggered out of viewport
     */
    window.addEventListener('mousemove', this.onMouseMove)
    /**
     * mousemove bind on window (same with body), instead of element;
     */
    window.addEventListener('mouseup', this.onMouseUp)

    element.addEventListener('mousedown', this.onMouseDown)
    element.addEventListener('wheel', this.onWheel)
  }

  detach() {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)

    this.element?.removeEventListener('mousedown', this.onMouseDown)
    this.element?.removeEventListener('wheel', this.onWheel)
    this.element = null
  }
}
