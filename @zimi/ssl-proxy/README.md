> 代码见 [@zimi/ssl-proxy](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/ssl-proxy)

## 建议作为命令行工具来使用

```
npx @zimi/ssl-proxy
```

### Options

```
-s --source <url>      source url (default: "https://localhost:3001")
-t --target <url>      target url (default: "http://localhost:3000")
-k --key <path>        ssl key path (default: builtin key.pem)
-c --cert <path>       ssl cert path (default: builtin cert.pem)
-n --name <string>     task name (default: "ssl-proxy")
-w --ws                enable websocket proxy (default: false)
-a --agent             enable use system agent (default: false)
-o --config <path>     config file path, .json
-f --follow-redirects  follow redirects (default: false)
-h, --help             display help for command
```

### config file

```ts
// config.json 可以是 ProxyServerConfig | ProxyServerConfig[]

interface ProxyServerConfig {
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
}
```

## 或者作为模块引入

```ts
import { proxy } from '@zimi/ssl-proxy'

const config: ProxyServerConfig = {
  // ...
}

proxy(config)
```
