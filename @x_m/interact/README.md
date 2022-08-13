# @x_m/interact

用户交互(move / scale / rotate) 和 交互方式(mouse / touch)的抽象

### install
```
yarn add @x_m/interact
```

### examples

``` typescript

import { MouseFormatter, TouchFormatter } from '@x_m/interact'

// --- mouse ---

const mouseFormatter = new MouseFormatter()

mouseFormatter.attach(element)

mouseFormatter.addListener('move', (...args) => {
  // do sth
})
mouseFormatter.addListener('scale', (...args) => {
  // do sth
})
mouseFormatter.addListener('rotate', (...args) => {
  // do sth
})

// --- touch ---

const touchFormatter = new TouchFormatter()

touchFormatter.attach(element)

touchFormatter.addListener('move', (...args) => {
  // do sth
})
touchFormatter.addListener('scale', (...args) => {
  // do sth
})
touchFormatter.addListener('rotate', (...args) => {
  // do sth
})

```
