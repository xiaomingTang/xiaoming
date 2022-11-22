import Link from 'next/link'
import Toastfy from 'toastify-js'
import usePWAInstall from '@/hooks/usePWAInstall'
import Anchor from '@/components/Anchor'

function PwaTrigger() {
  const { isInstalled, install } = usePWAInstall()
  if (isInstalled) {
    return <></>
  }
  return (
    <Anchor
      onClick={() => {
        install()
          .then(() => {
            Toastfy({
              text: '正在尝试添加到桌面, 可能需要一些时间',
              position: 'center',
            }).showToast()
          })
          .catch((err) => {
            Toastfy({
              text: err.message,
              position: 'center',
            }).showToast()
          })
      }}
    >
      添加到桌面
    </Anchor>
  )
}

export function DefaultHeader() {
  return (
    <>
      <header className='fixed w-full bg-primary-100 backdrop-blur z-header flex justify-between'>
        <div
          className={`
            max-w-screen-desktop m-auto
            flex-1 px-4 py-2 md:py-4
          `}
        >
          <Link href='/blog' passHref legacyBehavior>
            <Anchor className='mr-4'>文章</Anchor>
          </Link>
          <Link href='/tag' passHref legacyBehavior>
            <Anchor>标签</Anchor>
          </Link>
        </div>
        <div className='flex-0 px-4 py-2 md:py-4'>
          <PwaTrigger />
        </div>
      </header>
      <div className='py-2 md:py-4 pointer-events-none select-none'>&nbsp;</div>
    </>
  )
}
