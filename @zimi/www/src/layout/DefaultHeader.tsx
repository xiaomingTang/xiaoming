import Link from 'next/link'
import Anchor from '@/components/Anchor'

export function DefaultHeader() {
  return (
    <>
      <header className='fixed w-full bg-primary-100 backdrop-blur z-header'>
        <div
          className={`
        max-w-screen-desktop m-auto px-4 py-2
        md:py-4
      `}
        >
          <Link href='/blog' passHref legacyBehavior>
            <Anchor className='mr-4'>文章</Anchor>
          </Link>
          <Link href='/tag' passHref legacyBehavior>
            <Anchor>标签</Anchor>
          </Link>
        </div>
      </header>
      <div className='py-2 md:py-4 pointer-events-none select-none'>&nbsp;</div>
    </>
  )
}
