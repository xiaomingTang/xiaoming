import type { BreakpointOverrides as MuiBreakpointOverrides } from '@mui/material'

declare module '@mui/material' {
  export interface BreakpointOverrides extends MuiBreakpointOverrides {
    xs: false; // 移除 `xs` 断点
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // 添加 `mobile` 断点
    tablet: true;
    desktop: true;
  }
}
