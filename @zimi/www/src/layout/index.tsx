import classNames from 'classnames'
import { DefaultFooter } from './DefaultFooter'
import { DefaultHeader } from './DefaultHeader'

export default function DefaultLayout({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[]
  className?: React.HTMLAttributes<HTMLDivElement>['className']
}) {
  return (
    <div
      className={classNames(
        'bg-w-900 text-b-900 leading-normal text-base',
        className
      )}
    >
      <div className='min-h-screen'>
        <DefaultHeader />
        {children}
      </div>
      <DefaultFooter />
    </div>
  )
}
