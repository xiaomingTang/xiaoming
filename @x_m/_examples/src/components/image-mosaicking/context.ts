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
      set({
        files: newFiles,
        urls: newFiles.map((file) => URL.createObjectURL(file)),
      })
      return result
    },
    push: (...files) => {
      const newFiles = [...get().files]
      const result = newFiles.push(...files)
      set({
        files: newFiles,
        urls: newFiles.map((file) => URL.createObjectURL(file)),
      })
      return result
    },
  })
)
