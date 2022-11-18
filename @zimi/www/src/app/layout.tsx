import '@/styles/global.scss'

export default function Index(props: any) {
  return (
    <html lang='zh-CN'>
      <body>
        <div>root-header</div>
        {props.children}
        <div>root-footer</div>
      </body>
    </html>
  )
}
