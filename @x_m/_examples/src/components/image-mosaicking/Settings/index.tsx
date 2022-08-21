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
import { Settings as SettingsIcon } from '@mui/icons-material'
import styles from './index.module.scss'

export default function Settings({ className }: { className?: string }) {
  const [panelVisible, setPanelVisible] = useState(false)

  return (
    <>
      <IconButton
        color='primary'
        className={cln(className, styles.root)}
        title='通用设置'
        onClick={() => setPanelVisible((prev) => !prev)}
        component='button'
        size='small'
      >
        <SettingsIcon fontSize='small' />
      </IconButton>
      <Dialog
        aria-labelledby='settings for image-mosaicking'
        open={panelVisible}
        onClose={() => setPanelVisible(false)}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='alert-dialog-title'>通用设置</DialogTitle>
        <DialogContent>布局:</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setPanelVisible(false)}>
            取消
          </Button>
          <Button variant='contained' onClick={() => setPanelVisible(false)}>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
