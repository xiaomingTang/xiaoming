export const ALL_TAGS = [
  { name: 'blog', description: '王小明的日常生活' },
  { name: 'fe', description: '前端那些事' },
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
    title: '测试-1',
    description: '我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本',
    time: '2022-11-20T07:00:00+08:00',
    cover:
      'http://5b0988e595225.cdn.sohucs.com/images/20200114/18a00d990a104e78971f4b2cda431860.jpeg',
    tags: ['blog'],
    filePath: 'blog-1-测试-1.mdx',
  },
  {
    title: '测试-2',
    description:
      '我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本',
    time: '2022-11-20T08:00:00+08:00',
    cover: '/android-chrome-512x512.png',
    tags: ['fe'],
    filePath: 'blog-2-测试-2.mdx',
  },
  {
    title: '测试-3',
    description:
      '我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本我有很对哦描述文本',
    time: '2022-11-20T09:00:00+08:00',
    cover:
      'http://5b0988e595225.cdn.sohucs.com/images/20200114/18a00d990a104e78971f4b2cda431860.jpeg',
    tags: ['blog', 'fe'],
    filePath: 'blog-3-测试-3/index.mdx',
  },
  {
    title: '测试-4',
    time: '2022-11-20T10:00:00+08:00',
    cover: '/android-chrome-512x512.png',
    tags: [],
    filePath: 'blog-4-测试-4/index.mdx',
  },
]

export const ALL_ARTICLES = RAW_ALL_ARTICLES.map((item) => ({
  ...item,
  sluts: item.filePath
    .replace(/(\\index.mdx?|\/index.mdx?|.mdx?)$/gi, '')
    .split(/[/\\]/),
}))
