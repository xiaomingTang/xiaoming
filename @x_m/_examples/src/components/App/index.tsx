import React, { useMemo, useState } from 'react'
import styles from './index.module.css'

interface ComponentRouteProps {
  route: string
  description?: string
  component: React.ReactNode
  link?: never
}

interface LinkRouteProps {
  route: string
  description?: string
  component?: never
  link: string
}

function isComponentRoute<T extends Record<string, any>>(
  props: T & (ComponentRouteProps | LinkRouteProps)
): props is T & ComponentRouteProps {
  return !!(props as ComponentRouteProps).component
}

function Route(
  props: (ComponentRouteProps | LinkRouteProps) & {
    active?: boolean
    onClick?: () => void
  }
) {
  if (isComponentRoute(props)) {
    return (
      <a
        key={props.route}
        title={props.description}
        className={`${styles.menuItem} ${props.active ? styles.active : ''}`}
        onClick={props.onClick}
      >
        {props.route}
      </a>
    )
  }
  return (
    <a
      key={props.route}
      title={props.description}
      className={`${styles.menuItem} ${props.active ? styles.active : ''}`}
      onClick={props.onClick}
      href={(props as LinkRouteProps).link}
      target='_blank'
      rel='noreferrer'
    >
      {props.route}
    </a>
  )
}

export function App({
  routes,
}: {
  routes: (ComponentRouteProps | LinkRouteProps)[]
}) {
  const [route, setRoute] = useState(() =>
    new URL(window.location.href).searchParams.get('route'))
  const componentRoutes = useMemo(
    () =>
      routes.filter(
        (item) => !!(item as ComponentRouteProps).component
      ) as ComponentRouteProps[],
    [routes]
  )

  const curComponentRoute = useMemo(
    () =>
      (!route
        ? componentRoutes[0]
        : componentRoutes.find((item) => item.route === route) ?? {
          route: 'NOT FOUND',
          component: 'NOT FOUND',
        }),
    [componentRoutes, route]
  )

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        {routes.map((item) => (
          <Route
            key={item.route}
            active={item.route === route}
            onClick={() => {
              if (isComponentRoute(item)) {
                setRoute((prev) => {
                  if (prev !== item.route) {
                    const url = new URL(window.location.href)
                    url.searchParams.set('route', item.route)
                    window.history.replaceState(null, '', url.toString())
                  }
                  return item.route
                })
              }
            }}
            {...item}
          />
        ))}
      </aside>
      <main className={styles.main}>{curComponentRoute.component}</main>
    </div>
  )
}
