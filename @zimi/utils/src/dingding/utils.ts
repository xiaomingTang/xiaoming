import crypto from 'crypto'
import { DingError } from './error'

import type { DingRes, DingMessage } from './type'

/**
 * 生成加签签名（URL 编码的 base64 HMAC-SHA256）
 */
function generateDingSign(secret: string, timestamp: number): string {
  const signData = `${timestamp}\n${secret}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(signData)
  const sign = hmac.digest('base64')
  return encodeURIComponent(sign)
}

/**
 * 自定义机器人发送群消息
 *
 * https://open.dingtalk.com/document/orgapp/custom-robots-send-group-messages
 *
 * @example
 *
 * ```ts
 * import { sendDingGroupMessage, DingError } from '@zimi/utils'
 *
 * try {
 *   await sendDingGroupMessage({ xxx })
 *   console.log('success')
 * } catch (error) {
 *   if (DingError.isDingError(error)) {
 *     console.error(error)
 *   } else {
 *     console.error('unknown error: ', error)
 *   }
 * }
 * ```
 */
export async function sendDingGroupMessage(props: {
  accessToken: string
  /**
   * 可选参数，只有在启用了加签时才需要
   * 如果不启用加签，可以不传此参数
   */
  secret?: string
  data: DingMessage
}) {
  const { accessToken, secret, data } = props
  const url = new URL('https://oapi.dingtalk.com/robot/send')
  url.searchParams.set('access_token', accessToken)

  // 如果启用了加签
  if (secret) {
    const timestamp = Date.now()
    const sign = generateDingSign(secret, timestamp)
    url.searchParams.set('timestamp', timestamp.toString())
    url.searchParams.set('sign', sign)
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch(() => {
    // 仅在网络错误时才会抛错
    throw new DingError(-1, '网络错误')
  })

  if (!res.ok) {
    throw new DingError(res.status, `HTTP 错误: ${res.statusText}`)
  }

  const resObj: DingRes = await res.json().catch(() => {
    // 仅在解析 JSON 错误时才会抛错
    throw new DingError(-1, '响应解析错误')
  })
  const err = DingError.fromDingRes(resObj)
  if (err) {
    throw err
  }
}
