import { Grid } from '@mui/material'
import { ArticleMeta } from '@/mdx/constants'
import { BlogBriefCard } from './BlogBriefCard'

interface BlogListProps {
  blogs: ArticleMeta[]
}

export function BlogList({ blogs: articles }: BlogListProps) {
  if (articles.length === 0) {
    return <div className=' text-b-light'>哪有文章啊, 我怎么不知道</div>
  }
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
