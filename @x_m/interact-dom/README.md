# @x_m/interact-dom

对 [@x_m/interact](../interact/README.md) 在各个交互方式上做了一个封装

### install
```
yarn add @x_m/interact-dom
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
