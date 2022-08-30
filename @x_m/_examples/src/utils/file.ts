/**
 * @TODO
 * 目前按照该方法来对用户上传的文件生成唯一 ID,
 * 显然是不够准确的, 可能会重复, 待优化 ID 生成方案,
 * 或者给用户选择的权利: 不鉴定唯一性, 每次上传均重新生成 url & image
 */
export function geneFileKey(f: File): string {
  return `${f.name}-${f.size}-${f.lastModified}-${f.type}-${f.webkitRelativePath}`
}

export function deduplicateFiles(list: File[]): File[] {
  const map = {} as {
    [key in string]: File
  }
  const newList: File[] = []
  list.forEach((f) => {
    const key = geneFileKey(f)
    if (!map[key]) {
      newList.push(f)
      map[key] = f
    }
  })
  return newList
}

export const fileMap: Map<
  ReturnType<typeof geneFileKey>,
  HTMLImageElement
> = new Map()

export function geneImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const cachedImage = fileMap.get(geneFileKey(file))
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
      fileMap.set(geneFileKey(file), image)
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
