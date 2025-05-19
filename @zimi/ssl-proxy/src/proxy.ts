#!/usr/bin/env node

import { createCommand } from 'commander'

import { realpathSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { proxy, ProxyServerConfig } from './index.js'
import { toAbsPath } from './utils.js'
import { DEFAULT_SSL_CONFIG } from './constants.js'

function main() {
  const name = 'ssl-proxy'

  const program = createCommand(name)
    .option(
      '-s --source <url>',
      'source url, e.g. https://0.0.0.0:3001',
      'https://localhost:3001'
    )
    .option(
      '-t --target <url>',
      'target url, e.g. http://localhost:3000',
      'http://localhost:3000'
    )
    .option('-k --key <path>', 'ssl key path', DEFAULT_SSL_CONFIG.key)
    .option('-c --cert <path>', 'ssl cert path', DEFAULT_SSL_CONFIG.cert)
    .option('-n --name <string>', 'task name', name)
    .option('-w --ws', 'enable websocket proxy', true)
    .option('-a --agent', 'enable use system agent', true)
    .option('-o --config <path>', 'config file path')

  const parsed: ProxyServerConfig & {
    config?: string
  } = program.parse().opts()

  if (!parsed.config) {
    proxy(parsed)
    return
  }
  const absPath = toAbsPath(parsed.config)
  console.log(`[${name}] config file path: ${absPath}`)

  const content = readFileSync(absPath, 'utf8')
  let config: ProxyServerConfig | ProxyServerConfig[]

  try {
    config = JSON.parse(content)
  } catch (e) {
    throw new Error(`[${name}] config file parse error: ${e}`)
  }

  if (Array.isArray(config)) {
    config.forEach((item) => {
      proxy(item)
    })
  } else {
    proxy(config)
  }
}
function isMainModule() {
  try {
    const realArgv = realpathSync(process.argv[1] ?? '')
    const realFile = realpathSync(fileURLToPath(import.meta.url))

    return path.resolve(realArgv) === path.resolve(realFile)
  } catch {
    return false
  }
}
if (isMainModule()) {
  main()
} else {
  throw new Error(
    'This module is not intended to be imported. Please use it as a command line tool.'
  )
}
