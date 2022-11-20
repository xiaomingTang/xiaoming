import { Tag } from '@/mdx/constants'
import { TagList } from './TagList'

export function TagListPage({ tags }: { tags: readonly Tag[] }) {
  return (
    <div>
      <h3 className='font-bold'>所有标签:</h3>
      <div className='text-md py-2'>
        <TagList tags={tags} />
      </div>
    </div>
  )
}
