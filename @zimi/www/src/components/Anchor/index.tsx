import { AnchorHTMLAttributes, forwardRef, ForwardedRef } from 'react'
import cls from 'classnames'
import { ENV_CONFIG } from '@/config'

import styles from './index.module.scss'

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * @default false
   */
  underline?: boolean
  /**
   * @default false
   */
  underlineOnHover?: boolean
  /**
   * @default true
   */
  bold?: boolean
  /**
   * @default true
   */
  usePrimaryColorWhenhover?: boolean
}

const APP_URL = new URL(ENV_CONFIG.public.appRoot)

/**
 * - 仅用于控制样式及跳转行为
 * - 项目内组件/页面的跳转 请使用 next/link 的 Link 组件包裹该组件
 *
 * ``` typescript
 * // external link
 * <Anchor href='https://example.com/'>external link</Anchor>
 *
 * // inner link
 * <Link href='/' passHref legacyBehavior>
 *   <Anchor>inner link</Anchor>
 * </Link>
 * ```
 */
function Anchor(
  {
    underline = false,
    underlineOnHover = true,
    bold = true,
    usePrimaryColorWhenhover = true,
    href,
    target,
    rel,
    className,
    children,
    tabIndex = 0,
    ...props
  }: AnchorProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const url = new URL(href || '', ENV_CONFIG.public.appRoot)
  const isExternal = !url.hostname.endsWith(APP_URL.hostname)
  const finalTarget = target ?? (isExternal ? '_blank' : '_self')
  const finalRel = rel ?? isExternal ? 'noopener noreferrer' : undefined

  return (
    <a
      ref={ref}
      href={href}
      target={finalTarget}
      rel={finalRel}
      tabIndex={tabIndex}
      className={cls(
        className,
        styles.anchor,
        underline && styles.underline,
        underlineOnHover && styles.underlineOnHover,
        bold && 'font-bold',
        'cursor-pointer',
        usePrimaryColorWhenhover && styles.usePrimaryColorWhenhover
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export default forwardRef(Anchor)
