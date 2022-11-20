import classNames from 'classnames'
import { DefaultFooter } from './DefaultFooter'
import DefaultHead from './DefaultHead'
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
      <DefaultHead />
      <div className='min-h-screen'>
        <DefaultHeader />
        {children}
      </div>
      <DefaultFooter />
    </div>
  )
}
