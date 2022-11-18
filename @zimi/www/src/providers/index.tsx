import { createTheme, ThemeProvider } from '@mui/material'
import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'

const muiTheme = createTheme({})

export default function Providers({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <QueryParamProvider adapter={NextAdapter}>{children}</QueryParamProvider>
    </ThemeProvider>
  )
}
