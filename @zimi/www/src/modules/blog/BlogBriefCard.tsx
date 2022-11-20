import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { ArticleMeta } from '@/mdx/constants'
import Anchor from '@/components/Anchor'
import styles from './BlogBriefCard.module.scss'
import { TagList } from '../tag/TagList'

interface BlogBriefCardProps {
  article: ArticleMeta
}

const DEFAULT_COVER = '/android-chrome-512x512.png'

export function BlogBriefCard({ article }: BlogBriefCardProps) {
  const t = dayjs.utc(article.time)
  return (
    <Link
      href={{
        pathname: '/blog/[[...sluts]]',
        query: { sluts: article.sluts },
      }}
      passHref
      legacyBehavior
    >
      <Anchor underlineOnHover={false}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={article.cover || DEFAULT_COVER}
              width={600}
              height={600}
              className={styles.image}
              alt=''
            />
          </div>
          <div className={classNames(styles.content)}>
            <h3 className={styles.title}>{article.title}</h3>
            <div className={styles.description}>
              <div className={styles.innerDescription}>
                {article.description}
              </div>
            </div>
            <div className={styles.footer}>
              <time
                dateTime={t.format('YYYY-MM-DD HH:mm:ss')}
                className='mr-2 whitespace-nowrap'
              >
                {t.format('YYYY-MM-DD')}
              </time>
              <TagList
                tags={article.tags.map((item) => ({
                  name: item,
                  description: item,
                }))}
              />
            </div>
          </div>
        </div>
      </Anchor>
    </Link>
  )
}
