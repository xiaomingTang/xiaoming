import { Divider } from '@mui/material'
import { ArticleMeta } from '@/mdx/constants'
import { BlogList } from './BlogList'

export function BlogNotFound({ recommends }: { recommends: ArticleMeta[] }) {
  return (
    <div>
      <h3 className='text-2xl font-bold'>文章不存在或已被删除</h3>
      <Divider className=' my-4' />
      <div className='my-2'>你也可以看看:</div>
      <BlogList blogs={recommends} />
    </div>
  )
}
