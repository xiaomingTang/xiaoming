import type { BreakpointOverrides } from '@mui/material'

declare module '@mui/material' {
  interface BreakpointOverrides {
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
