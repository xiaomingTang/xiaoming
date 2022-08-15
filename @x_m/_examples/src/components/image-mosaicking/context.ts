import create from 'zustand'

interface ImageMosaickingState {
  files: File[]
  urls: string[]
  splice: (start: number, deleteCount: number, ...items: File[]) => File[]
  push: File[]['push']
}

// get().files.map((item) => URL.createObjectURL(item))

export const useImageMosaickingStore = create<ImageMosaickingState>(
  (set, get) => ({
    files: [],
    urls: [],
    splice: (start: number, deleteCount: number, ...items: File[]) => {
      const newFiles = [...get().files]
      const result = newFiles.splice(start, deleteCount, ...items)
      // 释放旧的 url (貌似不需要释放, 会自动释放? 不确定)
      // get().urls.forEach((url) => URL.revokeObjectURL(url))
      set({
        files: newFiles,
        urls: newFiles.map((file) => URL.createObjectURL(file)),
      })
      return result
    },
    push: (...files) => {
      const newFiles = [...get().files]
      const result = newFiles.push(...files)
      // 释放旧的 url (貌似不需要释放, 会自动释放? 不确定)
      // get().urls.forEach((url) => URL.revokeObjectURL(url))
      set({
        files: newFiles,
        urls: newFiles.map((file) => URL.createObjectURL(file)),
      })
      return result
    },
  })
)
