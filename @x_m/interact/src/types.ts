import EventEmitter from '@x_m/event-emitter'

export interface Point {
  x: number
  y: number
}

export type InteractEvents = {
  move: [Point]
  scale: [
    {
      ratio: number
      center: Point
    }
  ]
  rotate: [
    {
      ratio: number
      center: Point
    }
  ]
}

export type FormatterTypes = 'mouse' | 'touch'

export abstract class Interact extends EventEmitter<InteractEvents> {
  abstract enableMove: boolean

  abstract enableScale: boolean

  abstract enableRotate: boolean

  abstract attach(element: HTMLElement): void

  abstract detach(): void
}
