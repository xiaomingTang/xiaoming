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
import { IosShare } from '@mui/icons-material'
import styles from './index.module.scss'

export default function Export({ className }: { className?: string }) {
  const [panelVisible, setPanelVisible] = useState(false)

  return (
    <>
      <IconButton
        color='primary'
        className={cln(className, styles.root)}
        title='Export'
        onClick={() => setPanelVisible((prev) => !prev)}
        component='button'
        size='small'
      >
        <IosShare fontSize='small' />
      </IconButton>
      <Dialog
        aria-labelledby='export to image'
        open={panelVisible}
        onClose={() => setPanelVisible(false)}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='alert-dialog-title'>export</DialogTitle>
        <DialogContent>导出选项</DialogContent>
        <DialogActions>
          <Button onClick={() => setPanelVisible(false)}>取消</Button>
          <Button
            autoFocus
            variant='contained'
            onClick={() => setPanelVisible(false)}
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}