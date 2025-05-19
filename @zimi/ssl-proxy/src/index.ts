import httpProxy from 'http-proxy'

import { ProxyAgent } from 'proxy-agent'
import { readSslFile } from './utils.js'
import { DEFAULT_SSL_CONFIG } from './constants.js'

export interface ProxyServerConfig {
  /**
   * 必须 https, 例如:
   * - https://localhost:3001
   * - https://127.0.0.1:3001
   * - https://0.0.0.0:3001
   * - https://192.168.0.123:3001
   */
  source: string
  /**
   * 转发的目标，可以是任意地址
   */
  target: string
  /**
   * 该次代理任务的名称，用于日志输出显示
   */
  name?: string
  /**
   * 是否开启 WebSocket 代理
   * @default true
   */
  ws?: boolean
  /**
   * 是否使用系统代理
   * @default true
   */
  agent?: boolean
  /**
   * SSL 证书文件路径
   * - key.pem
   */
  key?: string
  /**
   * SSL 证书文件路径
   * - cert.pem
   */
  cert?: string
}

export function proxy(options: ProxyServerConfig) {
  const { source, target, name = 'ssl-proxy' } = options
  const sourceUrl = new URL(source)
  const targetUrl = new URL(target)

  if (sourceUrl.protocol !== 'https:') {
    throw new Error('source must be https')
  }

  const ws = !!(options.ws ?? true)
  const agent = !!(options.agent ?? true)

  const ssl =
    options.key && options.cert
      ? {
          key: options.key,
          cert: options.cert,
        }
      : DEFAULT_SSL_CONFIG

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
