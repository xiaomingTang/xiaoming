import React, { useState } from 'react'
import cln from 'classnames'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Info } from '@mui/icons-material'
import styles from './index.module.scss'

export default function Declaration({ className }: { className?: string }) {
  const [panelVisible, setPanelVisible] = useState(false)

  return (
    <>
      <IconButton
        color='primary'
        className={cln(className, styles.root)}
        title='本站声明'
        onClick={() => setPanelVisible((prev) => !prev)}
        component='button'
        size='small'
      >
        <Info fontSize='small' />
      </IconButton>
      <Dialog
        aria-labelledby='本站声明'
        open={panelVisible}
        onClose={() => setPanelVisible(false)}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='alert-dialog-title'>本站声明</DialogTitle>
        <DialogContent>
          本站为纯前端站点, 不会上传保存你的任何文件。
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant='contained'
            onClick={() => setPanelVisible(false)}
          >
            知道了
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
