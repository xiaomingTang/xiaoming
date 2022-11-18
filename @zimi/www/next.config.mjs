import nextPwa from 'next-pwa'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveRoot(...p) {
  return path.resolve(__dirname, ...p)
}

const withPWA = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    // 可以直接在 scss 中使用 @import 'mixin.scss',
    // 而无需带前缀 '~@/styles/mixin.scss'
    includePaths: [resolveRoot('src/styles')],
    // styles/common 中的 scss 文件统一在此处引入, 无需手动引入
    additionalData: `
      @use 'common/mixins.scss' as *;
    `,
  },
}

export default withPWA(nextConfig)
