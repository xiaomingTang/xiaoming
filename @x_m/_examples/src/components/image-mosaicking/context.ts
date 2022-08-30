import create from 'zustand'
import { Uploader } from './Upload/Uploader'

function deduplicate(list: HTMLImageElement[]) {
  const map = {} as {
    [key in string]: HTMLImageElement
  }
  const newList: HTMLImageElement[] = []
  list.forEach((img) => {
    if (!map[img.src]) {
      newList.push(img)
      map[img.src] = img
    }
  })
  return newList
}

interface ImageMosaickingState {
  images: HTMLImageElement[]
  splice: (
    start: number,
    deleteCount: number,
    ...items: HTMLImageElement[]
  ) => HTMLImageElement[]
  push: HTMLImageElement[]['push']
}

export const useImageMosaickingStore = create<ImageMosaickingState>(
  (set, get) => ({
    images: [],
    splice: (
      start: number,
      deleteCount: number,
      ...items: HTMLImageElement[]
    ) => {
      const newImages: HTMLImageElement[] = [...get().images]
      const result = newImages.splice(start, deleteCount, ...items)
      result.forEach((img) => {
        // 仅删除不在新增列表中的 img
        if (items.every((item) => item.src !== img.src)) {
          Uploader.delete({
            src: img.src,
          })
        }
      })
      set({
        images: deduplicate(newImages),
      })
      return result
    },
    push: (...images) => {
      const newImages: HTMLImageElement[] = [...get().images]
      const result = newImages.push(...images)
      set({
        images: deduplicate(newImages),
      })
      return result
    },
  })
)
