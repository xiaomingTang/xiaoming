import { Button } from '@mui/material'
import cn from 'classnames'
import Toastify from 'toastify-js'
import styles from './index.module.scss'

export default function Index() {
  return (
    <div className={cn(styles.root)}>
      <Button
        variant='contained'
        onClick={() => {
          Toastify({
            text: 'root on clicked',
          }).showToast()
        }}
      >
        root
      </Button>
    </div>
  )
}
