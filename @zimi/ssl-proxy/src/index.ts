import httpProxy from 'http-proxy'
import http from 'http'
import https from 'https'

import { ProxyAgent } from 'proxy-agent'
import type { IncomingMessage, ServerResponse } from 'http'
import { errorToString, readSslFile } from './utils.js'
import { DEFAULT_CONFIG, ProxyServerConfig } from './constants.js'

export function proxy(options: ProxyServerConfig) {
  const source = options.source || DEFAULT_CONFIG.source
  const target = options.target || DEFAULT_CONFIG.target
  const name = options.name || DEFAULT_CONFIG.name
  const key = options.key || DEFAULT_CONFIG.key
  const cert = options.cert || DEFAULT_CONFIG.cert
  const ws = options.ws ?? DEFAULT_CONFIG.ws
  const agent = options.agent ?? DEFAULT_CONFIG.agent
  const followRedirects =
    options.followRedirects ?? DEFAULT_CONFIG.followRedirects
  const logRequest = options.logRequest ?? DEFAULT_CONFIG.logRequest

  const sourceUrl = new URL(source)
  const targetUrl = new URL(target)

  const isHttps = sourceUrl.protocol === 'https:'

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

  const proxyServer = httpProxy.createProxyServer({
    xfwd: true,
    secure: false,
    ws,
    target: targetUrl,
    ssl: isHttps
      ? {
          key: readSslFile(ssl.key, 'key'),
          cert: readSslFile(ssl.cert, 'cert'),
        }
      : undefined,
    agent: agent ? new ProxyAgent() : undefined,
    changeOrigin: true,
    followRedirects,
  })

  // 添加 CORS 头部，允许跨域但禁止带 cookie
  function setCorsHeaders(req: IncomingMessage, res: ServerResponse) {
    const { origin } = req.headers
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers'] ||
        'Content-Type,Authorization'
    )
  }

  // 创建 http/https server
  const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    if (logRequest) {
      console.log(`[${name}] ${req.method} ${req.url}`)
    }
    setCorsHeaders(req, res)
    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }
    // path 重写：去除 sourceUrl.pathname 前缀，拼接到 target
    if (sourceUrl.pathname && sourceUrl.pathname !== '/') {
      const originalUrl = req.url || ''
      if (originalUrl.startsWith(sourceUrl.pathname)) {
        req.url = originalUrl.slice(sourceUrl.pathname.length) || '/'
      }
    }
    proxyServer.web(req, res)
  }

  const server = isHttps
    ? https.createServer(
        {
          key: readSslFile(ssl.key, 'key'),
          cert: readSslFile(ssl.cert, 'cert'),
        },
        requestHandler
      )
    : http.createServer(requestHandler)

  server.listen(+sourceUrl.port, sourceUrl.hostname)

  console.log(`[${name}] Proxying ${sourceUrl.href} to ${targetUrl.href}`)

  proxyServer.on('error', (err, req, res) => {
    const errorMessage = `[${name}] Error: ${errorToString(err)}`
    if (res) {
      ;(res as ServerResponse).writeHead?.(500, {
        'Content-Type': 'text/plain',
      })
      res.end(errorMessage)
    } else {
      console.error(errorMessage)
    }
  })
}
