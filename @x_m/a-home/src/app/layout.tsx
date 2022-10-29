import '@/styles/global.scss'
import { NextLayout } from '@/utils/next-utils'

export default NextLayout((props) => (
  <html lang='zh-CN'>
    <body>
      <div>root-header</div>
      {props.children}
      <div>root-footer</div>
    </body>
  </html>
))
