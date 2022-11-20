import Link from 'next/link'
import { Breadcrumbs, Divider, Typography } from '@mui/material'
import { ArticleMeta, Tag } from '@/mdx/constants'
import Anchor from '@/components/Anchor'
import { BlogList } from '../blog/BlogList'

export function TagPage({
  tag,
  articles,
}: {
  articles: ArticleMeta[]
  tag: Tag
}) {
  return (
    <div>
      <Breadcrumbs>
        <Link href='/tag' passHref legacyBehavior>
          <Anchor>标签列表</Anchor>
        </Link>
        <Typography>{tag.description}</Typography>
      </Breadcrumbs>
      <div className='my-4'>
        <Divider />
      </div>
      <div className='font-bold mb-2'>该标签下所有文章:</div>
      <BlogList blogs={articles} />
    </div>
  )
}
