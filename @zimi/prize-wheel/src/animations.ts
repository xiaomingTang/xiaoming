import clamp from 'lodash/clamp'

/**
 * 缓动函数
 * https://aaron-bird.github.io/2019/03/30/%E7%BC%93%E5%8A%A8%E5%87%BD%E6%95%B0(easing%20function)/
 */
export function easeInOutQuad({
  currentTime,
  targetTime,
  startValue,
  endValue,
}: {
  currentTime: number
  targetTime: number
  startValue: number
  endValue: number
}) {
  // 归一化 到 0 - 2
  let normalCurrentTime = clamp(currentTime / (targetTime / 2), 0, 2)
  const deltaValue = endValue - startValue
  if (normalCurrentTime < 1) {
    return startValue + (deltaValue / 2) * normalCurrentTime * normalCurrentTime
  }
  normalCurrentTime -= 1
  return (
    startValue -
    (deltaValue / 2) * (normalCurrentTime * (normalCurrentTime - 2) - 1)
  )
}
