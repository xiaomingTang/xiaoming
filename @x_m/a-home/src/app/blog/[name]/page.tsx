import { redirect } from 'next/navigation'
import { NextPage } from '@/utils/next-utils'
import { MdxLoader } from '@/components/MdxLoader'

export default NextPage<{ name: string }>((props) => {
  const name = props?.params?.name ?? ''

  if (!name) {
    redirect('/')
    return <></>
  }

  return <MdxLoader name={name} />
})
