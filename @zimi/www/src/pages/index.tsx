import { Button } from '@mui/material'
import Link from 'next/link'
import Toastify from 'toastify-js'
import DefaultLayout from '@/layout'
import Anchor from '@/components/Anchor'
import { DeviceTest } from '@/components/DeviceTest'
import useWindowSize from '@/hooks/useWindowSize'

export default function Index() {
  const { width } = useWindowSize('inner')
  return (
    <DefaultLayout>
      <DeviceTest />
      <div className='p-4'>
        <Button
          variant='contained'
          onClick={() => {
            Toastify({
              text: 'root on clicked',
            }).showToast()
          }}
        >
          root
        </Button>
        <Link href={`/?t=${width}`} passHref legacyBehavior>
          <Anchor>超链接 {width}</Anchor>
        </Link>
      </div>
    </DefaultLayout>
  )
}
