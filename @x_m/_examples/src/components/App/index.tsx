import React, { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isComponentRoute<T extends Record<string, any>>(
  props: T & (ComponentRouteProps | LinkRouteProps)
): props is T & ComponentRouteProps {
  return !!(props as ComponentRouteProps).component
}

function Route(
  props: (ComponentRouteProps | LinkRouteProps) & {
    active?: boolean
  }
) {
  const isComponent = isComponentRoute(props)

  const url = useMemo(() => {
    if (props.active) {
      return undefined
    }
    if (isComponent) {
      const tempUrl = new URL(window.location.href)
      tempUrl.searchParams.set('route', props.route)
      return tempUrl.toString()
    }
    return props.link
  }, [isComponent, props.active, props.link, props.route])

  return (
    <a
      key={props.route}
      title={props.description}
      className={`${styles.menuItem} ${props.active ? styles.active : ''}`}
      href={url}
      target={isComponent ? '' : '_blank'}
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
  const route = useMemo(
    () => new URL(window.location.href).searchParams.get('route'),
    []
  )

  const componentRoutes = useMemo(
    () =>
      routes.filter(
        (item) => !!(item as ComponentRouteProps).component
      ) as ComponentRouteProps[],
    [routes]
  )

  const curComponentRoute = useMemo(
    () =>
      !route
        ? componentRoutes[0]
        : componentRoutes.find((item) => item.route === route) ?? {
            route: 'NOT FOUND',
            component: 'NOT FOUND',
          },
    [componentRoutes, route]
  )

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        {routes.map((item) => (
          <Route key={item.route} active={item.route === route} {...item} />
        ))}
      </aside>
      <main className={styles.main}>{curComponentRoute.component}</main>
      <ToastContainer />
    </div>
  )
}
