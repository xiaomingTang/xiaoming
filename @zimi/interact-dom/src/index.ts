import { mat3 } from 'gl-matrix'
import {
  FormatterTypes,
  InteractEvents,
  MouseFormatter,
  Point,
  TouchFormatter,
} from '@zimi/interact'
import EventEmitter from '@zimi/event-emitter'

export default class InteractDom extends EventEmitter<{
  // eslint-disable-next-line no-use-before-define
  change: [InteractDom]
}> {
  private originTranslate: Point = {
    x: 0,
    y: 0,
  }

  private onMove = (...[pos]: InteractEvents['move']) => {
    mat3.multiply(this.matrix, [1, 0, 0, 0, 1, 0, pos.x, pos.y, 1], this.matrix)
    this.emit('change', this)
  }

  private onRotate = (...[{ ratio, center }]: InteractEvents['rotate']) => {
    const cos = Math.cos(ratio)
    const sin = Math.sin(ratio)
    const { x, y } = this.originTranslate
    const a = -(center.x - x)
    const b = -(center.y - y)
    mat3.multiply(
      this.matrix,
      [
        cos,
        sin,
        0,
        -sin,
        cos,
        0,
        a * cos - b * sin - a,
        a * sin + b * cos - b,
        1,
      ],
      this.matrix
    )
    this.emit('change', this)
  }

  private onScale = (...[{ ratio, center }]: InteractEvents['scale']) => {
    const { x, y } = this.originTranslate
    mat3.multiply(
      this.matrix,
      [
        ratio,
        0,
        0,
        0,
        ratio,
        0,
        (center.x - x) * (1 - ratio),
        (center.y - y) * (1 - ratio),
        1,
      ],
      this.matrix
    )
    this.emit('change', this)
  }

  matrix = mat3.create()

  mouseFormatter?: MouseFormatter

  touchFormatter?: TouchFormatter

  setOriginTranslate(translateOfCenter: Point) {
    this.originTranslate.x = translateOfCenter.x
    this.originTranslate.y = translateOfCenter.y
  }

  setOriginTranslateFromDomRect(domRect: DOMRect) {
    const { x, y, width, height } = domRect
    this.originTranslate = {
      x: x + width / 2,
      y: y + height / 2,
    }
  }

  setOriginTranslateFromElement(element: HTMLElement) {
    const savedTransform = element.style.transform
    // eslint-disable-next-line no-param-reassign
    element.style.transform = ''
    const { x, y, width, height } = element.getBoundingClientRect()
    this.originTranslate = {
      x: x + width / 2,
      y: y + height / 2,
    }
    // eslint-disable-next-line no-param-reassign
    element.style.transform = savedTransform
  }

  attach(
    element: HTMLElement,
    formatterTypes: FormatterTypes[] = ['mouse', 'touch']
  ) {
    if (!element) {
      console.error('[interact-dom]: element is required')
      return
    }
    this.setOriginTranslateFromElement(element)
    if (formatterTypes.includes('mouse')) {
      const mouseFormatter = new MouseFormatter({
        disabledWhenFiresTouchEvents: formatterTypes.includes('touch'),
      })
      mouseFormatter.attach(element)
      mouseFormatter.addListener('move', this.onMove)
      mouseFormatter.addListener('rotate', this.onRotate)
      mouseFormatter.addListener('scale', this.onScale)
      this.mouseFormatter = mouseFormatter
    }
    if (formatterTypes.includes('mouse')) {
      const touchFormatter = new TouchFormatter()
      touchFormatter.attach(element)
      touchFormatter.addListener('move', this.onMove)
      touchFormatter.addListener('rotate', this.onRotate)
      touchFormatter.addListener('scale', this.onScale)
      this.touchFormatter = touchFormatter
    }
  }

  detach(formatterTypes: FormatterTypes[] = ['mouse', 'touch']) {
    if (formatterTypes.includes('mouse')) {
      this.mouseFormatter?.detach()
    }
    if (formatterTypes.includes('touch')) {
      this.touchFormatter?.detach()
    }
  }

  formatToCss() {
    const m = this.matrix
    return `matrix(${m[0]},${m[1]},${m[3]},${m[4]},${m[6]},${m[7]})`
  }
}

console.log('test-ci-9')
