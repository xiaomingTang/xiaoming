// 可以使用 clip-path polygon 来处理

/* eslint-disable max-classes-per-file */
// import EventEmitter from "@x_m/event-emitter";

import clamp from 'lodash/clamp'

export class Point {
  moveable = true

  constraint?: Line

  x: number

  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  moveTo(x: number, y: number) {
    if (!this.moveable) {
      return this
    }
    if (!this.constraint) {
      this.x = x
      this.y = y
      return this
    }
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = this.constraint.endpoints
    const dAB = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    // dAN = (vAM * vAB) / dAB
    const dAN = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / dAB
    const lamda = clamp(dAN / dAB, 0, 1)
    this.x = x1 + lamda * (x2 - x1)
    this.y = y1 + lamda * (y2 - y1)
    return this
  }
}

export class Line {
  endpoints: [Point, Point]

  constructor(a: Point, b: Point) {
    this.endpoints = [a, b]
  }
}

export class Shape {
  points: Point[] = []

  constructor(points: Point[]) {
    this.points = points
  }
}

export function createRectLayout() {
  const points = [
    new Point(0, 0),
    new Point(0, 1),
    new Point(1, 1),
    new Point(1, 0),
  ]
  points.forEach((p) => {
    // eslint-disable-next-line no-param-reassign
    p.moveable = false
  })
  const shape = new Shape(points)
  return shape
}
