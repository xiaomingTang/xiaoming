import httpProxy from 'http-proxy'

import { ProxyAgent } from 'proxy-agent'
import { readSslFile } from './utils.js'
import { DEFAULT_CONFIG, ProxyServerConfig } from './constants.js'

export function proxy(options: ProxyServerConfig) {
  const source = options.source || DEFAULT_CONFIG.source
  const target = options.target || DEFAULT_CONFIG.target
  const name = options.name || DEFAULT_CONFIG.name
  const key = options.key || DEFAULT_CONFIG.key
  const cert = options.cert || DEFAULT_CONFIG.cert
  const ws = options.ws ?? DEFAULT_CONFIG.ws
  const agent = options.agent ?? DEFAULT_CONFIG.agent

  const sourceUrl = new URL(source)
  const targetUrl = new URL(target)

  if (sourceUrl.protocol !== 'https:') {
    throw new Error('source must be https')
  }

  const ssl =
    options.key && options.cert
      ? {
          key: options.key,
          cert: options.cert,
        }
      : {
          key,
          cert,
        }

  httpProxy
    .createServer({
      xfwd: true,
      secure: false,
      ws,
      target: targetUrl,
      ssl: {
        key: readSslFile(ssl.key, 'key'),
        cert: readSslFile(ssl.cert, 'cert'),
      },
      agent: agent ? new ProxyAgent() : undefined,
      changeOrigin: true,
      followRedirects: true,
    })
    .listen(+sourceUrl.port, sourceUrl.hostname)

  console.log(`[${name}] Proxying ${sourceUrl.href} to ${targetUrl.href}`)
}
