import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import Clock from './components/clock'
import PrizeWheel from './components/prize-wheel'
import Interact from './components/interact'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <App
    routes={[
      {
        name: 'Clock',
        value: <Clock />,
      },
      {
        name: 'PrizeWheel',
        value: <PrizeWheel />,
      },
      {
        name: 'Interact',
        value: <Interact />,
      },
    ]}
  />
)
