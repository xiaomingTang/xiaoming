import path from 'path'
import fs from 'fs/promises'
import { ALL_ARTICLES, ALL_TAGS, TagKey } from '../constants'

const PROJECT_ROOT = process.cwd()
const MDX_ROOT = path.join(PROJECT_ROOT, 'src/mdx/articles')

export async function getAllArticles() {
  return ALL_ARTICLES
}

export async function getArticle(sluts: string[]) {
  const filePath = sluts.join('/')
  const filePathGroup = [
    `${filePath}.mdx`,
    `${filePath}/index.mdx`,
    `${filePath}.md`,
    `${filePath}/index.md`,
  ]
  const article = (await getAllArticles()).find(({ filePath: iFilePath }) =>
    filePathGroup.includes(iFilePath)
  )
  if (!article) {
    return null
  }
  return {
    ...article,
    content: await fs.readFile(path.join(MDX_ROOT, article.filePath), {
      encoding: 'utf-8',
    }),
  }
}

export async function getAllTags() {
  return ALL_TAGS
}

export async function getTagByName(name?: string) {
  return (await getAllTags()).find((item) => item.name === name)
}

export async function getArticlesByTag(tagName?: string) {
  return (await getAllArticles()).filter((item) =>
    item.tags.includes(tagName as TagKey)
  )
}
