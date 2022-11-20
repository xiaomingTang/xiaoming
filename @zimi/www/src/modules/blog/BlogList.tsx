import { Grid } from '@mui/material'
import { ArticleMeta } from '@/mdx/constants'
import { BlogBriefCard } from './BlogBriefCard'

interface BlogListProps {
  blogs: ArticleMeta[]
}

export function BlogList({ blogs: articles }: BlogListProps) {
  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid item key={article.filePath} mobile={12}>
          <BlogBriefCard article={article} />
        </Grid>
      ))}
    </Grid>
  )
}
