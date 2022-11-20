import classNames from 'classnames'
import Link from 'next/link'
import Anchor from '@/components/Anchor'

interface TagItemProps {
  name: string
  description?: string
  className?: React.ObjectHTMLAttributes<HTMLObjectElement>['className']
}

export function TagItem({ name, description, className }: TagItemProps) {
  return (
    <object className={classNames('inline-flex', className)}>
      <Link
        href={{
          pathname: '/tag/[[...sluts]]',
          query: { sluts: [name] },
        }}
        passHref
        legacyBehavior
      >
        <Anchor
          className={`
          px-2 py-1 rounded bg-primary-100 transition-all
          active:bg-primary-300
          lg:hover:bg-primary-300 lg:active:bg-primary-200
        `}
          title={description ?? name}
        >
          {name}
        </Anchor>
      </Link>
    </object>
  )
}
