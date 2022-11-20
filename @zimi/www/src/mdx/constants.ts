export const ALL_TAGS = [
  { name: 'life', description: '日常生活' },
  { name: 'fe', description: '前端那些事' },
  { name: 'lol', description: '英雄联盟' },
] as const

export type TagKey = typeof ALL_TAGS[number]['name']
export type Tag = {
  name: TagKey
  description: string
}

export interface ArticleMeta {
  title: string
  time: string
  description?: string
  cover?: string
  tags: TagKey[]
  filePath: string
  sluts: string[]
}

const RAW_ALL_ARTICLES: Omit<ArticleMeta, 'sluts'>[] = [
  {
    title: '我的博客开张了',
    description: '开门大吉开门大吉开门大吉',
    time: '2022-11-20T14:44:04.050Z',
    cover: '/static/images/鞭炮.jpg',
    tags: ['life'],
    filePath: 'blog-1-开门大吉/index.mdx',
  },
]

export const ALL_ARTICLES = RAW_ALL_ARTICLES.map((item) => ({
  ...item,
  sluts: item.filePath
    .replace(/(\\index.mdx?|\/index.mdx?|.mdx?)$/gi, '')
    .split(/[/\\]/),
}))
