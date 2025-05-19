> 代码见 [@zimi/ssl-proxy](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/ssl-proxy)

## 建议作为命令行工具来使用

```
npx @zimi/ssl-proxy
```

### Options

```
  -s --source <url>   source url, e.g. https://0.0.0.0:3001 (default: "https://localhost:3001")
  -t --target <url>   target url, e.g. http://localhost:3000 (default: "http://localhost:3000")
  -k --key <path>     ssl key path (default: built-in key.pem)
  -c --cert <path>    ssl cert path (default: built-in cert.pem)
  -n --name <string>    task name (default: "ssl-proxy")
  -w --ws             enable websocket proxy (default: true)
  -a --agent          enable use system agent (default: true)
  -o --config <path>  config file path
  -h, --help          display help for command
```

### config file

```ts
// config.json 可以是 ProxyServerConfig | ProxyServerConfig[]

interface ProxyServerConfig {
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
```

## 或者作为模块引入

```ts
import { proxy } from '@zimi/ssl-proxy'

const config: ProxyServerConfig = {
  // ...
}

proxy(config)
```
