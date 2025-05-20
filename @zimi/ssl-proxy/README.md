> 代码见 [@zimi/ssl-proxy](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/ssl-proxy)

## 建议作为命令行工具来使用

```sh
npx @zimi/ssl-proxy
```

### 常用命令示例

```sh
# 1. 默认 https://localhost:3001 -> http://localhost:3000
npx @zimi/ssl-proxy

# 2. 指定源和目标: https://localhost:4001 -> http://localhost:3000
npx @zimi/ssl-proxy -s https://localhost:4001 -t http://localhost:3000

# 3. 代理本地 4000 端口到 v2ex.com，打印每个请求日志
npx @zimi/ssl-proxy -s http://localhost:4000 -t https://www.v2ex.com -l

# 4. 路径重写: 将 /api/* 代理到目标 /test/*
npx @zimi/ssl-proxy -s http://localhost:4000/api -t https://example.com/test

# 5. 使用自定义证书
npx @zimi/ssl-proxy -k ./my.key -c ./my.crt

# 6. 使用配置文件批量启动多个代理
npx @zimi/ssl-proxy -C ./config.json
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
-C --config <path>     config file path, .json
-f --follow-redirects  follow redirects (default: false)
-l --log-request       log each request (default: false)
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
  /**
   * 是否打印每个请求的日志
   * @default false
   */
  logRequest?: boolean
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
