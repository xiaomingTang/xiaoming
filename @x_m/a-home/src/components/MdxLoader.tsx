'use client'

import 'client-only'

import type { MDXProps } from 'mdx/types'
import { ComponentType } from 'react'

import MDX1 from '@/raw-blogs/1. Next.js 13 初试.mdx'
import { MdxNotFound } from './MdxNotFound'

const MDX_MAP: Record<string, ComponentType<MDXProps> | undefined> = {
  '1. Next.js 13 初试': MDX1,
}

export function MdxLoader({ name }: { name: string }) {
  const Mdx = MDX_MAP[name]
  if (!Mdx) {
    return <MdxNotFound name={name} />
  }
  return <Mdx />
}
