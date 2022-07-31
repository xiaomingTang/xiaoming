import React from 'react'
import { PrizeWheel, testPromise } from '../src/index'

export default function Example() {
  return (
    <button onClick={() => {
      testPromise()
    }}>
      PrizeWheel name: {PrizeWheel}
    </button>
  )
}
