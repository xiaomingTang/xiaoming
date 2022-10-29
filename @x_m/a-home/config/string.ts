export function B(rawValue = '', defaultValue = false): boolean {
  if (['true', 't', '1'].includes(rawValue.toLowerCase())) {
    return true
  }
  if (['false', 'f', '0'].includes(rawValue.toLowerCase())) {
    return false
  }
  return defaultValue
}

export function S(rawValue = '', defaultValue = ''): string {
  return rawValue || defaultValue
}

/**
 * @WARNING 该方法可能返回 Infinity, 需要调用者自己判断/筛选
 */
export function N(rawValue = '', defaultValue = 0): number {
  const num = parseFloat(rawValue)
  return Number.isNaN(num) ? defaultValue : num
}
