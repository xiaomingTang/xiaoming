import cln from 'classnames'
import { ThemeProvider, Typography, useTheme } from '@mui/material'
import { usePlatform } from '@/utils/device'
import styles from './index.module.scss'

export function DeviceTest() {
  const testTheme = useTheme()
  testTheme.typography.h4 = {
    color: 'black',
    [testTheme.breakpoints.only('tablet')]: {
      color: 'red',
    },
    [testTheme.breakpoints.only('desktop')]: {
      color: 'blue',
    },
  }

  const platform = usePlatform()

  return (
    <div className='p-4 font-bold'>
      <h3 className='underline'>在不同设备下, 以下文本应当会展示不同的颜色</h3>
      <p
        className={cln({
          'text-[black]': platform === 'mobile',
          'text-[red]': platform === 'tablet',
          'text-[blue]': platform === 'desktop',
        })}
      >
        ts 颜色
      </p>
      <p className='text-[black] tablet:text-[red] desktop:text-[blue]'>
        tailwind 测试
      </p>
      <p className={styles.colorTest}>scss 测试</p>
      <ThemeProvider theme={testTheme}>
        <Typography variant='h4'>mui 测试</Typography>
      </ThemeProvider>
    </div>
  )
}
