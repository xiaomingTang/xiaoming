import nextPwa from 'next-pwa'
import nextMdx from '@next/mdx'
import { resolveRoot, webpackConfig } from './utils/index.mjs'

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

const withPWA = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './utils/none-image-loader.js',
  },
  webpack: webpackConfig,
  sassOptions: {
    // 可以直接在 scss 中使用 @import 'mixin.scss',
    // 而无需带前缀 '~@/styles/mixin.scss'
    includePaths: [resolveRoot('src/styles')],
    // styles/common 中的 scss 文件统一在此处引入, 无需手动引入
    additionalData: `
      @use 'common/variables.scss' as *;
      @use 'common/mixins.scss' as *;
    `,
  },
}

export default withPWA(withMDX(nextConfig))
