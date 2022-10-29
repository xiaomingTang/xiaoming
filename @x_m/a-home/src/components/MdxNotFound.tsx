'use client'

import 'client-only'

export function MdxNotFound({ name }: { name: string }) {
  return <div>文章【{name}】不存在或已被移除.</div>
}
