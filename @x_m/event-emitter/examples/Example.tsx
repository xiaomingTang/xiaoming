import React, { useEffect } from 'react'
import EventEmitter from '../src/index'

const eventBus = new EventEmitter<{
  eat: ['apple' | 'peach', number]
  touch: [string]
}>()

export default function Example() {
  useEffect(() => {
    eventBus.addListener('eat', (food, count) => {
      console.log(`I had eat ${count} ${food}`)
    })

    eventBus.addListener(
      'touch',
      (something) => {
        console.log(`I'm touching ${something}`)
      },
      {
        // only triggered twice; Infinity if not specified
        times: 2,
      }
    )

    // I had eat 2 apple
    eventBus.emit('eat', 'apple', 2)

    // I'm touching apple
    eventBus.emit('touch', 'apple')
    // I'm touching peach
    eventBus.emit('touch', 'peach')
    // NOT triggered, as it only triggered twice
    eventBus.emit('touch', 'apple')

    return () => {
      eventBus.removeListener('eat')
      eventBus.removeListener('touch')
    }
  }, [])

  return <>open console to get more</>
}
