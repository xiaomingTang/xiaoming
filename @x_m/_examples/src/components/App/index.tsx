import React, { useMemo, useState } from 'react'
import styles from './index.module.css'

export function App({
  routes,
}: {
  routes: {
    name: string
    value: React.ReactNode
  }[]
}) {
  const [route, setRoute] = useState(
    new URL(window.location.href).searchParams.get('route')
  )

  const curElem = useMemo(
    () =>
      (!route
        ? routes[0]
        : routes.find((item) => item.name === route) ?? {
          name: 'NOT FOUND',
          value: 'NOT FOUND',
        }),
    [routes, route]
  )

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        <a
          href='https://github.com/xiaomingTang/xiaoming'
          target='_blank'
          rel="noreferrer"
          className={styles.menuItem}
          title='open in github'
        >
          open in github
        </a>
        {routes.map(({ name }) => (
          <a
            key={name}
            className={`${styles.menuItem} ${
              route === name ? styles.active : ''
            }`}
            onClick={() => {
              setRoute((prev) => {
                if (prev !== name) {
                  const url = new URL(window.location.href)
                  url.searchParams.set('route', name)
                  window.history.pushState(null, '', url.toString())
                }
                return name
              })
            }}
          >
            {name}
          </a>
        ))}
      </aside>
      <main className={styles.main}>{curElem.value}</main>
    </div>
  )
}
