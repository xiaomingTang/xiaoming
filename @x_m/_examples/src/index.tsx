import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import Suspensed from './utils/Suspensed'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <App
    routes={[
      {
        route: 'Open in github',
        link: 'https://github.com/xiaomingTang/xiaoming',
      },
      {
        route: 'Clock',
        component: <Suspensed loader={() => import('./components/clock')} />,
      },
      {
        route: 'Interact',
        component: <Suspensed loader={() => import('./components/interact')} />,
      },
      {
        route: 'PrizeWheel',
        component: <Suspensed loader={() => import('./components/prize-wheel')} />,
      },
    ]}
  />
)
