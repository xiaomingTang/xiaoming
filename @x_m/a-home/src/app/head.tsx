import { ENV_CONFIG } from '@ROOT/config/config'
import manifest from '@ROOT/public/manifest.json'
import { NextHead } from '@/utils/next-utils'

const HOST = ENV_CONFIG.public.appRoot

export default NextHead(() => (
  <>
    <meta name='application-name' content={manifest.name} />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
    <meta name='apple-mobile-web-app-title' content={manifest.name} />
    <meta name='description' content={manifest.description} />
    <meta name='format-detection' content='telephone=no' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='msapplication-tap-highlight' content='no' />
    <meta name='theme-color' content={manifest.theme_color} />

    <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
    <link rel='manifest' href='/manifest.json' />
    <link rel='shortcut icon' href='/favicon.ico' />

    <meta name='twitter:card' content='summary' />
    <meta name='twitter:url' content={HOST} />
    <meta name='twitter:title' content={manifest.name} />
    <meta name='twitter:description' content={manifest.description} />
    <meta name='twitter:image' content={`${HOST}/android-chrome-192x192.png`} />
    <meta name='twitter:creator' content='@xiaomin58135718' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={manifest.name} />
    <meta property='og:description' content={manifest.description} />
    <meta property='og:site_name' content={manifest.name} />
    <meta property='og:url' content={HOST} />
    <meta property='og:image' content={`${HOST}/apple-touch-icon.png`} />

    <meta
      name='viewport'
      content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
    />

    <link
      rel='apple-touch-startup-image'
      href='/splash/2048x2732.png'
      sizes='2048x2732'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/1668x2224.png'
      sizes='1668x2224'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/1536x2048.png'
      sizes='1536x2048'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/1125x2436.png'
      sizes='1125x2436'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/1242x2208.png'
      sizes='1242x2208'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/750x1334.png'
      sizes='750x1334'
    />
    <link
      rel='apple-touch-startup-image'
      href='/splash/640x1136.png'
      sizes='640x1136'
    />
  </>
))
