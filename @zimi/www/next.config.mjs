import nextPwa from 'next-pwa'
import * as path from 'path'
import { getHashDigest } from 'loader-utils'
import { fileURLToPath } from 'url'
import nextMdx from '@next/mdx'

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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function resolveRoot(...p) {
  return path.resolve(__dirname, ...p)
}

function hashOnlyIdent(context, _, exportName) {
  return getHashDigest(
    Buffer.from(
      `filePath:${path
        .relative(context.rootContext, context.resourcePath)
        .replace(/\\+/g, '/')}#className:${exportName}`
    ),
    // 使用base64编码会出现 / 在字符当中，在cssnano进行压缩的时候，会把其当作没有闭合的「注释」。
    'md5',
    'base62', // [a - z A - Z 0 - 9]
    6
  ).replace(/^(-?\d|--)/, '_$1')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias['@ROOT'] = resolveRoot()
    config.resolve.alias['@'] = resolveRoot('src')
    if (!dev) {
      // https://stackoverflow.com/a/69166434
      config.module.rules
        .find((rule) => typeof rule.oneOf === 'object')
        .oneOf.filter((rule) => Array.isArray(rule.use))
        .forEach((rule) => {
          rule.use.forEach((moduleLoader) => {
            if (
              moduleLoader.loader &&
              moduleLoader.loader.includes('css-loader') &&
              !moduleLoader.loader.includes('postcss-loader') &&
              moduleLoader.options &&
              typeof moduleLoader.options.modules === 'object'
            ) {
              moduleLoader.options.modules.getLocalIdent = hashOnlyIdent
            }
          })
        })
    }

    return config
  },
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
