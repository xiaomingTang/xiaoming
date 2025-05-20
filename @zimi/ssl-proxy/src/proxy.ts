#!/usr/bin/env node

import { createCommand } from 'commander'

import { realpathSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { proxy } from './index.js'
import { toAbsPath } from './utils.js'
import { DEFAULT_CONFIG, ProxyServerConfig } from './constants.js'

function main() {
  const name = 'ssl-proxy'

  const program = createCommand(name)
    .option('-s --source <url>', `source url`, DEFAULT_CONFIG.source)
    .option('-t --target <url>', 'target url', DEFAULT_CONFIG.target)
    .option('-k --key <path>', 'ssl key path', DEFAULT_CONFIG.key)
    .option('-c --cert <path>', 'ssl cert path', DEFAULT_CONFIG.cert)
    .option('-n --name <string>', 'task name', DEFAULT_CONFIG.name)
    .option('-w --ws', 'enable websocket proxy', DEFAULT_CONFIG.ws)
    .option('-a --agent', 'enable use system agent', DEFAULT_CONFIG.agent)
    .option('-o --config <path>', 'config file path, .json')
    .option(
      '-f --follow-redirects',
      'follow redirects',
      DEFAULT_CONFIG.followRedirects
    )

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
