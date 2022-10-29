import { redirect } from 'next/navigation'
import { NextPage } from '@/utils/next-utils'

export default NextPage(() => {
  redirect('/')
  return <></>
})
