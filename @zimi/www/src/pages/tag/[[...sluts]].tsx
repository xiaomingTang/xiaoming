import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { ENV_CONFIG } from '@/config'
import { getAllTags, getArticlesByTag, getTagByName } from '@/mdx/utils'
import { ArticleMeta } from '@/mdx/constants'
import DefaultLayout from '@/layout'
import { TagNotFound } from '@/modules/tag/TagNotFound'
import { TagListPage } from '@/modules/tag/TagListPage'
import { TagPage } from '@/modules/tag/TagPage'

type QueryParams = {
  sluts: string[]
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const allTags = await getAllTags()
  const tagPaths = allTags.map((item) => ({
    params: {
      sluts: [item.name],
    },
  }))
  tagPaths.push({
    params: {
      sluts: [],
    },
  })
  return {
    paths: tagPaths,
    fallback: false,
  }
}

type DestructPromise<T> = T extends Promise<infer R> ? R : never

type Props = QueryParams & {
  articles: ArticleMeta[]
  allTags: DestructPromise<ReturnType<typeof getAllTags>>
  tag: null | DestructPromise<ReturnType<typeof getAllTags>>[number]
}

export const getStaticProps: GetStaticProps<Props, QueryParams> = async (
  props
) => {
  const sluts = props.params?.sluts ?? []
  const allTags = await getAllTags()
  const articles = await getArticlesByTag(sluts[0])
  const tag = await getTagByName(sluts[0])
  return {
    props: {
      articles,
      allTags,
      tag: tag ?? null,
      sluts,
    },
  }
}

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { tag, sluts } = props
  return (
    <DefaultLayout>
      <NextSeo
        title={`${tag ? `${tag.description}(标签)` : '标签列表页'} - ${
          ENV_CONFIG.manifest.name
        }`}
        description={tag?.description ?? ENV_CONFIG.manifest.description}
      />
      <div className=' max-w-screen-desktop m-auto p-4'>
        {sluts.length > 0 &&
          (tag ? (
            <TagPage tag={tag} articles={props.articles} />
          ) : (
            <TagNotFound recommends={props.allTags} />
          ))}
        {sluts.length === 0 && <TagListPage tags={props.allTags} />}
      </div>
    </DefaultLayout>
  )
}
