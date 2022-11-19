import { createTheme, ThemeProvider } from '@mui/material'
import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'

const muiTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      desktop: 1024,
    },
  },
  palette: {
    primary: {
      light: 'rgba(20, 74, 169, 0.7)',
      main: 'rgba(20, 74, 169, 0.8)',
      dark: 'rgba(20, 74, 169, 0.9)',
    },
  },
})

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
