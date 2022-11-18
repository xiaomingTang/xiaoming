import Link, { LinkProps } from 'next/link'
import { ENV_CONFIG } from '@/config'
import { getUrl } from '@/utils/get-url'

function isISO88591(str: string) {
  return str.split('').every((s) => s <= 'ÿ')
}

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode
  } & React.RefAttributes<HTMLAnchorElement>

const { hostname } = getUrl(ENV_CONFIG.public.appRoot)

export function Anchor(props: AnchorProps) {
  const { href: inputHref, target: inputTarget, rel: inputRel } = props
  const href = getUrl(inputHref)
  const defaultOpenInNewTab = !href.hostname.endsWith(hostname)
  const target = inputTarget || (defaultOpenInNewTab ? '_blank' : '_self')
  const rel = inputRel || (target === '_blank' ? 'noref' : '')

  if (isISO88591(href.toString())) {
    return <Link {...props} target={target} rel={rel} />
  }
  return <a {...props} href={href.toString()} target={target} rel={rel} />
}
