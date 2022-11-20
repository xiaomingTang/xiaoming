import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getAllArticles, getAllTags, getArticle } from '@/mdx/utils'
import { ArticleMeta } from '@/mdx/constants'
import DefaultLayout from '@/layout'
import { BlogNotFound } from '@/modules/blog/BlogNotFound'
import { BlogListPage } from '@/modules/blog/BlogListPage'
import { BlogPage } from '@/modules/blog/BlogPage'

import 'github-markdown-css'

type QueryParams = {
  sluts: string[]
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const allArticles = await getAllArticles()
  const articlePaths = allArticles.map((item) => ({
    params: {
      sluts: item.sluts,
    },
  }))
  articlePaths.push({
    params: {
      sluts: [],
    },
  })
  return {
    paths: articlePaths,
    fallback: false,
  }
}

type DestructPromise<T> = T extends Promise<infer R> ? R : never

type Props = QueryParams & {
  allArticles: ArticleMeta[]
  allTags: DestructPromise<ReturnType<typeof getAllTags>>
  article:
    | null
    | (DestructPromise<ReturnType<typeof getArticle>> & {
        source: MDXRemoteSerializeResult
      })
}

export const getStaticProps: GetStaticProps<Props, QueryParams> = async (
  props
) => {
  const sluts = props.params?.sluts ?? []
  const allArticles = await getAllArticles()
  const allTags = await getAllTags()
  const article = await getArticle(sluts)
  return {
    props: {
      allArticles,
      allTags,
      article: article && {
        ...article,
        source: await serialize(article.content),
      },
      sluts,
    },
  }
}

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article, sluts } = props
  return (
    <DefaultLayout>
      <div className=' max-w-screen-desktop m-auto p-4'>
        {sluts.length > 0 &&
          (article ? (
            <BlogPage article={article} recommends={props.allArticles} />
          ) : (
            <BlogNotFound recommends={props.allArticles} />
          ))}
        {sluts.length === 0 && (
          <BlogListPage articles={props.allArticles} tags={props.allTags} />
        )}
      </div>
    </DefaultLayout>
  )
}
