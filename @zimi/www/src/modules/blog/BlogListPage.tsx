import { Divider } from '@mui/material'
import { ArticleMeta, Tag } from '@/mdx/constants'
import { TagList } from '../tag/TagList'
import { BlogList } from './BlogList'

export function BlogListPage({
  articles,
  tags,
}: {
  articles: ArticleMeta[]
  tags: readonly Tag[]
}) {
  return (
    <div>
      <h3 className='font-bold'>所有标签:</h3>
      <div className='text-md py-2'>
        <TagList tags={tags} />
      </div>
      <div className='my-4'>
        <Divider />
      </div>
      <h3 className='font-bold py-2'>所有文章:</h3>
      <BlogList blogs={articles} />
    </div>
  )
}
