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
  implements Interact {
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
    this.emit('move', {
      x: e.movementX,
      y: e.movementY,
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
        ratio: e.deltaY > 0 ? 0.9 : 1 / 0.9,
        center,
      })
    }
    if (
      this.enableRotate &&
      !!e.shiftKey !== (this.mouseButtonOfScale === 'shift-required')
    ) {
      this.emit('rotate', {
        ratio: e.deltaY > 0 ? (15 * Math.PI) / 180 : -(15 * Math.PI) / 180,
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
   * IF AND ONLY IF TouchFormatter be used at the same time,
   * HIGHLY recommended disabledWhenFiresTouchEvents be true.
   * learn more: https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceCapabilities/firesTouchEvents
   * @default false
   */
  disabledWhenFiresTouchEvents: boolean

  /**
   * MouseFormatter emit 的 scale, 表示每个滚轮事件, 缩 0.9 倍(or 放大 1/0.9 倍);
   * MouseFormatter emit 的 rotate, 表示每个滚轮事件, 旋转 15°;
   * 使用者可自行添加倍率
   */
  constructor(options?: MouseFormatterProps) {
    super()
    this.enableMove = options?.enableMove ?? true
    this.enableScale = options?.enableScale ?? true
    this.enableRotate = options?.enableRotate ?? true
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
