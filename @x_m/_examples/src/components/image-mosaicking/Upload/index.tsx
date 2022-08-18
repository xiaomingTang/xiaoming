import React from 'react'
import cln from 'classnames'
import { Box, Button } from '@mui/material'
import { useImageMosaickingStore } from '../context'
import styles from './index.module.scss'

export default function Upload({ className }: { className?: string }) {
  const store = useImageMosaickingStore()

  return (
    <Box className={cln(className)}>
      <Button
        sx={{
          width: '100%',
          height: '100%',
        }}
        variant='contained'
        component='label'
        aria-label='upload picture'
      >
        upload
        <input
          hidden
          type='file'
          multiple
          accept='image/*'
          className={styles.input}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            if (target.files) {
              store.push(...target.files)
            }
          }}
        />
      </Button>
    </Box>
  )
}
