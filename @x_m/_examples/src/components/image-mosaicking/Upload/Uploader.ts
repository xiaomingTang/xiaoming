import type { PickOneOf } from '@x_m/type-utils'

/**
 * @TODO
 * 目前按照该方法来对用户上传的文件生成唯一 ID,
 * 显然是不够准确的, 可能会重复, 待优化 ID 生成方案,
 * 或者给用户选择的权利: 不鉴定唯一性, 每次上传均重新生成 url & image
 */
export function geneFileKey(f: File): string {
  return `${f.name}-${f.size}-${f.lastModified}-${f.type}-${f.webkitRelativePath}`
}

export class Uploader {
  private static fileMap: Map<string, HTMLImageElement> = new Map()

  static delete(
    options: PickOneOf<{
      src: string
      key: string
    }>
  ) {
    if (options.key) {
      this.fileMap.delete(options.key)
    }
    if (options.src) {
      const [key] =
        [...this.fileMap.entries()].find(
          ([, val]) => val.src === options.src
        ) ?? []
      if (key) {
        this.fileMap.delete(key)
      }
    }
  }

  static upload(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const cachedImage = this.fileMap.get(geneFileKey(file))
      if (cachedImage) {
        resolve(cachedImage)
        return
      }
      const image = new Image()
      const url = URL.createObjectURL(file)
      image.onload = () => {
        URL.revokeObjectURL(url)
        image.onload = null
        image.onerror = null
        this.fileMap.set(geneFileKey(file), image)
        resolve(image)
      }
      image.onerror = (err) => {
        URL.revokeObjectURL(url)
        image.onload = null
        image.onerror = null
        console.error(err)
        reject(new Error(`image load error: ${file.name}`))
      }
      image.src = url
    })
  }

  static async uploads(...files: File[]) {
    const result = await Promise.allSettled(files.map((f) => this.upload(f)))
    const fulfilled = result.filter(
      (item) => item.status === 'fulfilled'
    ) as PromiseFulfilledResult<HTMLImageElement>[]
    const rejected = result.filter(
      (item) => item.status === 'rejected'
    ) as PromiseRejectedResult[]
    return {
      fulfilled: fulfilled.map((item) => item.value),
      rejected: rejected.map((item) => item.reason),
    }
  }
}
