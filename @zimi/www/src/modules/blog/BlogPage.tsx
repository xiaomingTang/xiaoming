import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { MDXComponents } from 'mdx/types'
import StartToastifyInstance from 'toastify-js'
import Link from 'next/link'
import { Breadcrumbs, Button, Divider, Typography } from '@mui/material'
import { ArticleMeta } from '@/mdx/constants'
import { getArticle } from '@/mdx/utils'
import Anchor from '@/components/Anchor'
import { BlogList } from './BlogList'

type DestructPromise<T> = T extends Promise<infer R> ? R : never

const components: MDXComponents = {
  Button,
  a: (props) => (
    <Link href={props.href || '.'} passHref legacyBehavior>
      <Anchor {...props} ref={null} />
    </Link>
  ),
}

export function BlogPage({
  recommends,
  article,
}: {
  recommends: ArticleMeta[]
  article: DestructPromise<ReturnType<typeof getArticle>> & {
    source: MDXRemoteSerializeResult
  }
}) {
  if (typeof window !== 'undefined') {
    window.Toastify = StartToastifyInstance
  }
  return (
    <div>
      <Breadcrumbs>
        <Link href='/blog' passHref legacyBehavior>
          <Anchor>文章列表</Anchor>
        </Link>
        <Typography>{article.title}</Typography>
      </Breadcrumbs>
      <div className='my-4'>
        <Divider />
      </div>
      <article className='markdown-body p-4 rounded'>
        <MDXRemote {...article.source} components={components} />
      </article>
      <div className='font-bold mt-6 mb-2'>更多推荐:</div>
      <BlogList blogs={recommends} />
    </div>
  )
}
