import Link, { LinkProps } from 'next/link'

function isISO88591(str: string) {
  return str.split('').every((s) => s <= 'ÿ')
}

export function Anchor(props: LinkProps) {
  if (isISO88591(props.href.toString())) {
    return <Link {...props} />
  }
  return <a />
}
