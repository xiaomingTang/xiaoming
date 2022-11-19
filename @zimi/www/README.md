@WARNING:
- 如果需要修改设备尺寸的定义, 则需要修改以下几处:
    - [tailwind.config.js](tailwind.config.js) 中的 `screens`
    - [src/styles/common/mixins.scss](src/styles/common/mixins.scss) 中的 `@mixin device`
    - [src/providers/index.tsx](src/providers/index.tsx) 中的 `muiTheme`
    - [src/utils/device.ts](src/utils/device.ts) 中的 `getPlatform` & `usePlatform`

- 如果需要修改颜色的定义, 则需要修改以下几处:
    - [tailwind.config.js](tailwind.config.js) 中的 `colors`
    - [src/styles/common/variables.scss](src/styles/common/variables.scss)
    - [src/providers/index.tsx](src/providers/index.tsx) 中的 `muiTheme`
