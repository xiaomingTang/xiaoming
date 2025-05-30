import { DING_ERROR_CODE_SOLUTION_MAP } from './constants'

import type { DingRes } from './type'

function getSolution(res: DingRes): string | null {
  const { errcode, errmsg } = res
  const codeStr = `${errcode}` as keyof typeof DING_ERROR_CODE_SOLUTION_MAP
  const solution = DING_ERROR_CODE_SOLUTION_MAP[codeStr] ?? null
  if (solution) {
    return solution
  }
  if (errcode !== 310000) {
    return null
  }
  /**
   * 安全设置错误码
   *
   * https://open.dingtalk.com/document/orgapp/custom-robots-send-group-messages#6a8e23113eggw
   */
  if (errmsg === 'keywords not in content') {
    return '请检查消息内容是否包含关键词'
  }
  if (errmsg === 'invalid timestamp') {
    return '请检查时间戳是否正确'
  }
  if (errmsg === 'sign not match') {
    return '请检查签名是否正确'
  }
  const ipMatch = errmsg.match(/ip (\d+\.\d+\.\d+\.\d+) not in whitelist/)
  if (ipMatch) {
    const ip = ipMatch[1]
    return `请检查 IP 地址 ${ip} 是否在白名单中`
  }
  return null
}

export class DingError extends Error {
  code: number

  message: string

  get solution() {
    return getSolution({
      errcode: this.code,
      errmsg: this.message,
    })
  }

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
    this.name = 'DingError'
  }

  static fromDingRes(res: DingRes): DingError | null {
    const { errcode, errmsg } = res
    if (errcode === 0) {
      return null
    }
    return new DingError(errcode, errmsg)
  }

  static isDingError(e: unknown): e is DingError {
    if (e instanceof Error) {
      return e instanceof DingError || e.name === 'DingError'
    }
    return false
  }

  toString() {
    let str = `${this.name} [${this.code}]: ${this.message}`
    if (this.solution) {
      str += ` - 解决方案: ${this.solution}`
    }
    return str
  }
}
