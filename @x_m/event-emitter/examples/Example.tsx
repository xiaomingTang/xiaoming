import React from 'react'
import { EventEmitter, testPromise } from '../src/index'

export default function Example() {
  return (
    <button onClick={() => {
      testPromise()
    }}>
      EventEmitter name: {EventEmitter}
    </button>
  )
}
