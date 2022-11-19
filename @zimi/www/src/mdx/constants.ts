export const ALL_TAGS = {
  blog: '日常博客',
}

export type Tag = keyof typeof ALL_TAGS

export interface ArticleMeta {
  title: string
  description: string
  time: string
  cover?: string
  tags: Tag[]
  filePath: string
  sluts: string[]
}

export const ALL_ARTICLES: ArticleMeta[] = [
  {
    title: '测试-1',
    description: '',
    time: '2022-11-20T07:00:00+08:00',
    tags: [],
    filePath: 'blog-1-测试-1.mdx',
  },
  {
    title: '测试-2',
    description: '',
    time: '2022-11-20T08:00:00+08:00',
    tags: [],
    filePath: 'blog-2-测试-2.mdx',
  },
  {
    title: '测试-3',
    description: '',
    time: '2022-11-20T09:00:00+08:00',
    tags: [],
    filePath: 'blog-3-测试-3/index.mdx',
  },
].map((item) => ({
  ...item,
  sluts: item.filePath
    .replace(/(\\index.mdx?|\/index.mdx?|.mdx?)$/gi, '')
    .split(/[/\\]/),
}))
