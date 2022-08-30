import React, { useState } from 'react'
import cln from 'classnames'
import { Box, Button, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import { useImageMosaickingStore } from '../context'
import styles from './index.module.scss'
import { Uploader } from './Uploader'

export default function Upload({ className }: { className?: string }) {
  const store = useImageMosaickingStore()
  const [loading, setLoading] = useState(false)

  return (
    <Box className={cln(className)}>
      <Button
        sx={{
          width: '100%',
          height: '100%',
        }}
        disabled={loading}
        variant='contained'
        component='label'
        aria-label='upload picture'
      >
        {loading ? <CircularProgress size={16} /> : 'UPLOAD'}
        <input
          hidden
          disabled={loading}
          type='file'
          multiple
          accept='image/*'
          className={styles.input}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            if (target.files) {
              setLoading(true)
              Uploader.uploads(...target.files)
                .then((res) => {
                  store.push(...res.fulfilled)
                  if (res.rejected.length > 0) {
                    toast.error(`${res.rejected.length} 张图片上传失败`)
                  }
                })
                .finally(() => {
                  setLoading(false)
                })
            }
          }}
        />
      </Button>
    </Box>
  )
}
