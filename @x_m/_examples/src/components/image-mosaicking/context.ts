import create from 'zustand'
import {
  deduplicateFiles,
  fileMap,
  geneFileKey,
  geneImage,
} from '../../utils/file'

interface ImageMosaickingState {
  files: File[]
  images: HTMLImageElement[]
  splice: (start: number, deleteCount: number, ...items: File[]) => File[]
  push: File[]['push']
}

export const useImageMosaickingStore = create<ImageMosaickingState>(
  (set, get) => ({
    files: [],
    images: [],
    splice: (start: number, deleteCount: number, ...items: File[]) => {
      let newFiles: File[] = [...get().files]
      const result = newFiles.splice(start, deleteCount, ...items)
      result.forEach((f) => {
        fileMap.delete(geneFileKey(f))
      })
      newFiles = deduplicateFiles(newFiles)
      Promise.all(newFiles.map((f) => geneImage(f)))
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
      let newFiles = [...get().files]
      const result = newFiles.push(...files)
      newFiles = deduplicateFiles(newFiles)
      Promise.all(newFiles.map((f) => geneImage(f)))
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
