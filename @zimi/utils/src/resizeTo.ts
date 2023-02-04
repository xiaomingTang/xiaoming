interface Size {
  width: number
  height: number
}

interface ResizeProps {
  src: Size
  target: Size
  /**
   * 概念等同于 object-fit
   */
  fit: 'cover' | 'contain'
}

/**
 * @example
 * ``` ts
 *  const src = {
 *    width: 100,
 *    height: 200,
 *  }
 *
 *  const target = {
 *    width: 300,
 *    height: 400,
 *  }
 *
 *  // srcFitCover is {
 *  //   width: 300,
 *  //   height: 600,
 *  // }
 *  const srcFitCover = resizeTo({
 *    src,
 *    target,
 *    fit: 'cover',
 *  })
 *
 *  // srcFitContain is {
 *  //   width: 200,
 *  //   height: 400,
 *  // }
 *  const srcFitContain = resizeTo({
 *    src,
 *    target,
 *    fit: 'contain',
 *  })
 * ```
 */
export function resizeTo({ src, target, fit }: ResizeProps): Size {
  let newWidth = 1
  let newHeight = 1
  const srcRatio = src.width / src.height
  const tarRatio = target.width / target.height
  const isFat = srcRatio > tarRatio

  if (fit === 'contain') {
    if (isFat) {
      newWidth = target.width
      newHeight = newWidth / srcRatio
    } else {
      newHeight = target.height
      newWidth = newHeight * srcRatio
    }
  } else if (isFat) {
    newHeight = target.height
    newWidth = newHeight * srcRatio
  } else {
    newWidth = target.width
    newHeight = newWidth / srcRatio
  }
  return {
    width: newWidth,
    height: newHeight,
  }
}
