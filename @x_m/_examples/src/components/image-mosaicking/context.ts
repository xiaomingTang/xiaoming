import create from 'zustand'

interface ImageMosaickingState {
  files: File[]
  images: HTMLImageElement[]
  splice: (start: number, deleteCount: number, ...items: File[]) => File[]
  push: File[]['push']
}

// @TODO: 每次上传的 file 都是不一样的对象, 也就是说这个 Map 的 key 一直在变化, 目前该缓存未按预期工作
// 需要找出一个方法使缓存生效(根据内容 hash?)
// 如果找不出来, 就需要将该 Map 移除(因为现在起了负作用)
export const fileMap: Map<File, HTMLImageElement> = new Map()

function getImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const cachedImage = fileMap.get(file)
    if (cachedImage) {
      resolve(cachedImage)
      return
    }
    const image = new Image()
    const url = URL.createObjectURL(file)
    image.onload = () => {
      URL.revokeObjectURL(url)
      fileMap.set(file, image)
      resolve(image)
    }
    image.onerror = (err) => {
      URL.revokeObjectURL(url)
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
      const newFiles = [...get().files]
      const result = newFiles.splice(start, deleteCount, ...items)
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
