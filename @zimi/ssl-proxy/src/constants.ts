import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface ProxyServerConfig {
  /**
   * 例如:
   * - "https://localhost:3001"
   * - "https://127.0.0.1:3001"
   * - "https://0.0.0.0:3001"
   * - "https://192.168.0.123:3001"
   * @default "https://localhost:3001"
   */
  source: string
  /**
   * 转发的目标, 可以是任意地址, 例如:
   * - "http://localhost:3000"
   * @default "http://localhost:3000"
   */
  target: string
  /**
   * 该次代理任务的名称, 用于日志输出显示
   * @default "ssl-proxy"
   */
  name?: string
  /**
   * 是否开启 WebSocket 代理
   * @default false
   */
  ws?: boolean
  /**
   * 是否使用系统代理
   * @default false
   */
  agent?: boolean
  /**
   * SSL 证书文件路径
   * @default "built-in key.pem"
   */
  key?: string
  /**
   * SSL 证书文件路径
   * @default "built-in cert.pem"
   */
  cert?: string
  /**
   * 是否跟随重定向
   * @default false
   */
  followRedirects?: boolean
  /**
   * 是否打印每个请求的日志
   * @default false
   */
  logRequest?: boolean
}

export const DEFAULT_CONFIG = {
  source: 'https://localhost:3001',
  target: 'http://localhost:3000',
  name: 'ssl-proxy',
  ws: false,
  agent: false,
  key: path.resolve(__dirname, '../resources/key.pem'),
  cert: path.resolve(__dirname, '../resources/cert.pem'),
  followRedirects: false,
  logRequest: false,
} satisfies ProxyServerConfig
