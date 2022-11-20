import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import DefaultLayout from '@/layout'
import { getAllArticles, getAllTags } from '@/mdx/utils'
import { BlogListPage } from '@/modules/blog/BlogListPage'
import { ENV_CONFIG } from '@/config'

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = await getAllArticles()
  const allTags = await getAllTags()
  return {
    props: {
      allArticles,
      allTags,
    },
  }
}

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <DefaultLayout>
      <NextSeo
        title={`首页 - ${ENV_CONFIG.manifest.name}`}
        description={ENV_CONFIG.manifest.description}
      />
      <div className=' max-w-screen-desktop m-auto p-4'>
        <BlogListPage articles={props.allArticles} tags={props.allTags} />
      </div>
    </DefaultLayout>
  )
}
