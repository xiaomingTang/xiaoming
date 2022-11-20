import Head from 'next/head'
import manifest from '@ROOT/public/manifest.json'

export default function DefaultHead() {
  return (
    <Head>
      <meta name='application-name' content={manifest.name} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={manifest.short_name} />
      <meta name='description' content={manifest.description} />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-TileColor' content='#494149' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content={manifest.theme_color} />

      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <link rel='shortcut icon' href='/favicon.ico' />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://tytcn.com' />
      <meta name='twitter:title' content={manifest.name} />
      <meta name='twitter:description' content={manifest.description} />
      <meta
        name='twitter:image'
        content='https://tytcn.com/android-chrome-192x192.png'
      />
      <meta name='twitter:creator' content='@xiaomin58135718' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={manifest.name} />
      <meta property='og:description' content={manifest.description} />
      <meta property='og:site_name' content={manifest.name} />
      <meta property='og:url' content='https://tytcn.com' />
      <meta
        property='og:image'
        content='https://tytcn.com/apple-touch-icon.png'
      />

      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
      />

      {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
    <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
    </Head>
  )
}
