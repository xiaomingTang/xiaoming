import create from 'zustand'

interface ImageMosaickingState {
  files: File[]
  images: HTMLImageElement[]
  splice: (start: number, deleteCount: number, ...items: File[]) => File[]
  push: File[]['push']
}

/**
 * @TODO
 * 目前按照该方法来对用户上传的文件生成唯一 ID,
 * 显然是不够准确的, 可能会重复, 待优化 ID 生成方案,
 * 或者给用户选择的权利: 不鉴定唯一性, 每次上传均重新生成 url & image
 */
function geneFileKey(f: File): string {
  return `${f.name}-${f.size}-${f.lastModified}-${f.type}-${f.webkitRelativePath}`
}

export const fileMap: Map<
  ReturnType<typeof geneFileKey>,
  HTMLImageElement
> = new Map()

function getImage(file: File): Promise<HTMLImageElement> {
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

export const useImageMosaickingStore = create<ImageMosaickingState>(
  (set, get) => ({
    files: [],
    images: [],
    splice: (start: number, deleteCount: number, ...items: File[]) => {
      const newFiles: File[] = [...get().files]
      const result = newFiles.splice(start, deleteCount, ...items)
      result.forEach((f) => {
        fileMap.delete(geneFileKey(f))
      })
      Promise.all(newFiles.map((f) => getImage(f)))
        .then((images) => {
          set({
            files: newFiles,
            images,
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('image load error, open console to get more')
        })
      return result
    },
    push: (...files) => {
      const newFiles = [...get().files]
      const result = newFiles.push(...files)
      Promise.all(newFiles.map((f) => getImage(f)))
        .then((images) => {
          set({
            files: newFiles,
            images,
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('image load error, open console to get more')
        })
      return result
    },
  })
)
