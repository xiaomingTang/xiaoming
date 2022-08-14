import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import Suspensed from './utils/Suspensed'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <App
    routes={[
      {
        route: 'open in github',
        description: 'xiaoming 的 github',
        link: 'https://github.com/xiaomingTang/xiaoming',
      },
      {
        route: 'clock',
        description: '模拟实体时钟',
        component: <Suspensed loader={() => import('./components/clock')} />,
      },
      {
        route: 'interact',
        description: '用户交互: 拖拽、缩放、旋转',
        component: <Suspensed loader={() => import('./components/interact')} />,
      },
      {
        route: 'image-mosaicking',
        description: '图片拼接',
        component: (
          <Suspensed loader={() => import('./components/image-mosaicking')} />
        ),
      },
      {
        route: 'prize-wheel',
        description: '幸运大转盘',
        component: (
          <Suspensed loader={() => import('./components/prize-wheel')} />
        ),
      },
    ]}
  />
)
