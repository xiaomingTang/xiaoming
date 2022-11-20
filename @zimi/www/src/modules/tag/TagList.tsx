import { Tag } from '@/mdx/constants'
import { TagItem } from './TagItem'

interface TagListProps {
  tags: readonly Tag[]
}

export function TagList({ tags }: TagListProps) {
  return (
    <>
      {tags.map((tag) => (
        <TagItem key={tag.name} className='mr-2' {...tag} />
      ))}
    </>
  )
}
