import { Divider } from '@mui/material'
import { Tag } from '@/mdx/constants'
import { TagList } from './TagList'

export function TagNotFound({ recommends }: { recommends: readonly Tag[] }) {
  return (
    <div>
      <h3 className='text-2xl font-bold'>标签不存在或已被删除</h3>
      <Divider className=' my-4' />
      <div className='my-2'>你也可以看看:</div>
      <TagList tags={recommends} />
    </div>
  )
}
