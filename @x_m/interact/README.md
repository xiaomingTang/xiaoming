# @x_m/interact

用户交互(move / scale / rotate) 和 交互方式(mouse / touch)的抽象

### install
```
yarn add @x_m/interact
```

### examples

``` typescript

import InteractDom from '@x_m/interact-dom'

const interact = new InteractDom()
const elem = document.querySelector('xxx')

interact.attach(elem)
interact.addListener('change', () => {
  elem.style.transform = interact.formatToCss()
})

```
