'use server'

import 'server-only'

import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <Link href={'/blog/abc'}>1. Next.js 13 初试</Link>
      <br />
    </div>
  )
}
