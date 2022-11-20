import GitHubIcon from '@mui/icons-material/GitHub'
import Anchor from '@/components/Anchor'
import { ENV_CONFIG } from '@/config'

const now = new Date()

export function DefaultFooter() {
  return (
    <footer
      className={`
    flex flex-col justify-between items-center text-sm text-center px-4 py-6 bg-b-100
    tablet:flex-row
  `}
    >
      <div className='flex flex-col justify-center items-center tablet:flex-row'>
        <div className='flex justify-center items-center'>
          <span>© {now.getFullYear()}</span>
          <Anchor
            href='https://github.com/xiaomingTang'
            className='flex justify-center items-center mx-2'
          >
            <GitHubIcon className='text-base' />
            小明
          </Anchor>
          <Anchor href={ENV_CONFIG.public.appRoot}>
            {ENV_CONFIG.manifest.short_name}
          </Anchor>
        </div>
        <Anchor
          href='https://beian.miit.gov.cn/'
          className='my-1 tablet:my-0 tablet:ml-2'
        >
          赣ICP备2021003257号-1
        </Anchor>
      </div>
      <div>
        Powered by
        <Anchor href='https://nextjs.org/' className='ml-1'>
          Next.js
        </Anchor>
      </div>
    </footer>
  )
}
