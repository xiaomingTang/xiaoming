import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect } from 'react'
import type { MDXComponents } from 'mdx/types'
import { serialize } from 'next-mdx-remote/serialize'
import Toastify from 'toastify-js'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Button } from '@mui/material'
import { getAllArticles, getAllTags, getArticle } from '@/mdx/utils'
import { ArticleMeta } from '@/mdx/constants'

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

type Props = {
  allArticles: ArticleMeta[]
  allTags: DestructPromise<ReturnType<typeof getAllTags>>
  article:
    | null
    | (DestructPromise<ReturnType<typeof getArticle>> & {
        source: MDXRemoteSerializeResult
      })
} & QueryParams

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

const components: MDXComponents = {
  Button,
}

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props
  if (typeof window !== 'undefined') {
    window.Toastify = Toastify
  }
  if (article) {
    return <MDXRemote {...article.source} components={components} />
  }
  return (
    <>
      <Button variant='contained'>测试</Button>
    </>
  )
}
